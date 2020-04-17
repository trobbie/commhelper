#!/bin/bash

if lsof -Pi :4002 -sTCP:LISTEN -t >/dev/null ; then
  echo "Port 4002 already in use.  Assuming DynamoDB Local already running. Exiting..."
  exit 0
fi

# Assuming:
#  1) JAVA installed
#  2) AWS-CLI installed
#  3) AWS credentials configured (`aws configure`)

DYNAMODB_LOCAL_DIR=dynamodb_local
DOWNLOADED_FILE=dynamodb_local_latest.tar.gz

command -v java >/dev/null 2>&1 || { echo >&2 "Java is required, but it's not installed.  Aborting."; exit 1; }
command -v aws >/dev/null 2>&1 || { echo >&2 "AWS-CLI is required, but it's not installed.  Aborting."; exit 1; }

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
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 4002
