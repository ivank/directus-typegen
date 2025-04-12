#!/usr/bin/env bash

# Stop script on error
set -e

# Set output colors (or don't use colors if NO_COLOR=true is set)
if [ -z "$NO_COLOR" ]; then
  RED='\033[0;31m'
  CYAN='\033[0;36m'
  END='\033[0m'
else
  RED=''
  CYAN=''
  END=''
fi

SCHEMA_FILE=schema.yaml

# Declare required commands and the steps needed to install them
declare -A REQUIRED_COMMANDS

REQUIRED_COMMANDS["docker"]="https://docs.docker.com/engine/install/"

USAGE="
Usage: $(basename "$0") -p <FROM PROJECT> [OPTIONS]

This script downloads the data model snapshot saves it in the example folder
Following instructions from: https://www.restack.io/docs/directus-knowledge-directus-export-data-model

Examples:

    script/update-schema.sh

Options:
  -f ${CYAN}output-file${END}        the file output. Default \"$SCHEMA_FILE\"
  -h ${CYAN}${END}                   Show this message

Required commands: ${!REQUIRED_COMMANDS[*]}
"

while getopts ":p:f:hy" opt; do
  case ${opt} in
  f)
    SCHEMA_FILE=$OPTARG
    ;;
  h)
    echo -e "$USAGE"
    exit 0
    ;;
  :)
    echo -e "${RED}Error: Option -${OPTARG} requires an argument${END}"
    echo -e "$USAGE"
    exit 1
    ;;
  ?)
    echo -e "${RED}Error: Invalid option: -${OPTARG}${END}"
    echo -e "$USAGE"
    exit 1
    ;;
  esac
done

for COMMAND in "${!REQUIRED_COMMANDS[@]}"; do
  if ! command -v "$COMMAND" &>/dev/null; then
    echo -e "${RED}Error: $COMMAND needs to be installed. ${REQUIRED_COMMANDS[$COMMAND]}${END}"
    exit 1
  fi
done

docker exec "directus" npx directus schema snapshot ./snapshot.yaml --yes

echo -e "Snapshot generated. Downloading to ${CYAN}$SCHEMA_FILE${END} ..."

docker cp "directus":/directus/snapshot.yaml "$SCHEMA_FILE"
