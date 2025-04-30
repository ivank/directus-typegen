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

DRY_RUN="--dry-run"
SCHEMA_FILE=schema.yaml

# Declare required commands and the steps needed to install them
declare -A REQUIRED_COMMANDS

REQUIRED_COMMANDS["docker"]="https://docs.docker.com/engine/install/ubuntu/"

USAGE="
Usage: $0 -f <SNAPSHOT FILE> [OPTIONS]

After obtaining the schema with script/update-schema.sh, this script applies it to the running docker container
from docker-compose.yaml
Following instructions from: https://www.restack.io/docs/directus-knowledge-directus-export-data-model

Examples:

    $0
    $0 -y
    $0 -y -f /tmp/schema.yaml

Options:
  -f ${CYAN}snapshot-file${END}      the snapshot file. Default \"$SCHEMA_FILE\"
  -y ${CYAN}${END}                   apply the snapshot
  -h ${CYAN}${END}                   Show this message

Required commands: ${!REQUIRED_COMMANDS[*]}
"

while getopts ":f:hy" opt; do
    case ${opt} in
    y)
        DRY_RUN=""
        ;;
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

# Apply the schema, downloaded by script/update-schema.sh
# ---------------------------------------------
docker cp "$SCHEMA_FILE" directus:/directus/snapshot.yaml

echo -e "Uploaded $INPUT_FILE to pod ${CYAN}$POD${END}. Applying snapshot ..."

docker exec directus npx directus schema apply ./snapshot.yaml --yes "$DRY_RUN"
