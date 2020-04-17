#!/bin/bash

echo "ENV: $NODE_ENV"
if [ "$NODE_ENV" == "dev" ] || [ "$NODE_ENV" == "test" ]; then
  echo "This environment is approved for a data reset."
else
  echo "Can only reset the data from development environments."
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
