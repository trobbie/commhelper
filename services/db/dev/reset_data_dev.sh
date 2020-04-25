#!/bin/bash

. config.db.service

# DESCRIPTION:
# This script resets all data models and supplies seed data.
# Execution environments (dev, ci_test, prod) are considered.

echo "ENV: $COMMHELPER_ENV"
if [ "$COMMHELPER_ENV" == "dev" ] || [ "$COMMHELPER_ENV" == "ci_test" ]; then
  echo "This environment is approved for a data reset."
else
  echo "Can only reset the data from approved environments."
  echo "Exiting..."
  exit 1
fi

echo ----------------------------------
echo CREATING DATABASE
echo ----------------------------------
cd migrations
./_create_all_tables.sh
cd ..
echo ----------------------------------
echo LOADING DATA
echo ----------------------------------
cd seeds
./_load_all.sh
cd ..
echo ----------------------------------
echo TESTING DATABASE
echo ----------------------------------
./test_dynamodb_local.sh
