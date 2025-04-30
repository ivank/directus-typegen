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

USERNAME="admin@example.com"
PASSWORD="test"
TEST_DATA_FILE="test-data.json"

# Declare required commands and the steps needed to install them
declare -A REQUIRED_COMMANDS

REQUIRED_COMMANDS["curl"]="https://curl.se/download.html"
REQUIRED_COMMANDS["jq"]="https://stedolan.github.io/jq/download/"

USAGE="
Usage: $0 -u <USERNAME> -p <PASSWORD> [OPTIONS]

This script downloads the data model snapshot based on directus rest api responses, used to mock the test data

Examples:

    $0 -f /test/data/my-test-data.json
    $0 -u admin@example.com -p test -f /test/data/my-test-data.json

Options:
  -u ${CYAN}username${END}           the username to use to authenticate with the directus. Default \"$USERNAME\"
  -p ${CYAN}password${END}           the password to use to authenticate with the directus. Default \"$PASSWORD\"
  -f ${CYAN}test-data-file${END}     the test data file to output. Default \"$TEST_DATA_FILE\"
  -h ${CYAN}${END}                   Show this message

Required commands: ${!REQUIRED_COMMANDS[*]}
"

while getopts ":u:p:f:h" opt; do
    case ${opt} in
    u)
        USERNAME=$OPTARG
        ;;
    p)
        PASSWORD=$OPTARG
        ;;
    f)
        TEST_DATA_FILE=$OPTARG
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

if [ -z "$USERNAME" ] || [ -z "$PASSWORD" ]; then
    echo -e "${RED}Error: Username and password are required${END}"
    echo -e "$USAGE"
    exit 1
fi

for COMMAND in "${!REQUIRED_COMMANDS[@]}"; do
    if ! command -v "$COMMAND" &>/dev/null; then
        echo -e "${RED}Error: $COMMAND needs to be installed. ${REQUIRED_COMMANDS[$COMMAND]}${END}"
        exit 1
    fi
done

TOKEN=$(curl --silent --request POST http://localhost:8055/auth/login --header "Content-Type: application/json" --data "{\"email\": \"$USERNAME\", \"password\": \"$PASSWORD\"}" | jq -r '.data.access_token')

echo -e "Logged in as ${CYAN}$USERNAME${END} with token ${CYAN}$TOKEN${END} "

COLLECTIONS=$(curl --silent --request GET http://localhost:8055/collections --header "Authorization: Bearer $TOKEN" | jq -r '.data')
FIELDS=$(curl --silent --request GET http://localhost:8055/fields --header "Authorization: Bearer $TOKEN" | jq -r '.data')
RELATIONS=$(curl --silent --request GET http://localhost:8055/relations --header "Authorization: Bearer $TOKEN" | jq -r '.data')

jq -n --argjson collections "$COLLECTIONS" --argjson fields "$FIELDS" --argjson relations "$RELATIONS" '{"collections": $collections, "fields": $fields, "relations": $relations}' >"$TEST_DATA_FILE"

echo -e "Test data written to ${CYAN}$TEST_DATA_FILE${END}"
