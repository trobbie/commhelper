#!/bin/bash

# DESCRIPTION:
# The scripts used for DynamoDB Local service (e.g. creating seed data) require AWS-CLI.
# This script installs AWS-CLI if not already installed.  And it configures AWS-CLI with
# default parameters, if not already configured.
# Execution environments (dev, ci_test, prod) are considered.


AWS_INSTALL_FILE_URL=https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip
AWS_TEMP_FILE=awscliv2.zip
# since accessible and used only locally, credentials don't matter as long as they are set
AWS_DEFAULT_CREDS="fakeMyKeyId2\nfakeSecretAccessKey2\n"
AWS_DEFAULT_CONF="us-east-1\njson\n"

# run this in dev/test environments before running the db service (start_dynamodb_local.sh)
echo "ENV: $NODE_ENV"
if [ "$NODE_ENV" != "dev" ] && [ "$NODE_ENV" != "ci_test" ]; then
  echo "ERROR: Cannot configure DynamoDB Local for unknown environment..."
  echo "Exiting..."
  exit 1
fi

# Java will ultimately be required to run the db service
command -v java >/dev/null 2>&1 || { echo >&2 "Java is required, but it's not installed.  Aborting."; exit 1; }

#*************************************************
echo "Checking for AWS-CLI installation..."
command -v aws >/dev/null 2>&1
# TODO: consider checking AWS-CLI version too
if [ $? -eq 0 ]; then
  echo "AWS-CLI already found..."
else
  echo "Installing AWS-CLI"
  curl "$AWS_INSTALL_FILE_URL" -o "$AWS_TEMP_FILE"
  unzip $AWS_TEMP_FILE
  ./aws/install
fi
aws --version

#*************************************************
echo "Configuring AWS-CLI..."
if [[ -f ~/.aws/credentials ]]; then
  echo "[CONFIG] Credentails already found."
  CREDS_TO_INPUT="\n\n"
else
  CREDS_TO_INPUT="$AWS_DEFAULT_CREDS" # defaults
fi

if [[ -f ~/.aws/config ]]; then
  echo "[CONFIG] Region/Output already found."
  CONF_TO_INPUT="\n\n"
else
  CONF_TO_INPUT="$AWS_DEFAULT_CONF" # defaults
fi
echo -e "$CREDS_TO_INPUT$CONF_TO_INPUT" | aws configure
if [ "$NODE_ENV" == "ci_test" ]; then
  # disable the client-side paging during ci tests
  echo -e "cli_pager=" >> ~/.aws/config
fi


