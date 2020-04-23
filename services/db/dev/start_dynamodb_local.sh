#!/bin/bash

# DESCRIPTION:
# Run the DynamoDB Local service on the localhost.  It is installed if not already installed.
# Java is required to run DynamoDB Local.
# Execution environments (dev, ci_test, prod) are considered.

source config.db.service

echo "ENV: $NODE_ENV"
if [ "$NODE_ENV" == "dev" ] || [ "$NODE_ENV" == "ci_test" ]; then
  echo "This environment is approved for running DynamoDB Local."
else
  echo "ERROR: Can only run DynamoDB Local for known environments."
  echo "Exiting..."
  exit 1
fi

if lsof -Pi :$DB_SERVICE_PORT -sTCP:LISTEN -t >/dev/null ; then
  echo "Port $DB_SERVICE_PORT already in use.  Assuming DynamoDB Local already running. Exiting..."
  exit 0
fi

DYNAMODB_LOCAL_DIR=dynamodb_local
DOWNLOADED_FILE=dynamodb_local_latest.tar.gz

command -v java >/dev/null 2>&1 || { echo >&2 "Java is required, but it's not installed.  Aborting."; exit 1; }

echo "Checking if ${DYNAMODB_LOCAL_DIR} exists.  If so, assume ready to run..."
if [ ! -d ${DYNAMODB_LOCAL_DIR} ]; then
    mkdir -p ${DYNAMODB_LOCAL_DIR}
    cd ${DYNAMODB_LOCAL_DIR}
    curl -sO https://s3-us-west-2.amazonaws.com/dynamodb-local/${DOWNLOADED_FILE}
    tar xvzf ${DOWNLOADED_FILE}
    rm ${DOWNLOADED_FILE}
    cd ..
fi

echo Running DynamoDB Local instance...
cd ${DYNAMODB_LOCAL_DIR}
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port $DB_SERVICE_PORT
