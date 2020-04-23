#!/bin/bash

aws dynamodb batch-write-item \
  --request-items file://./users.json \
  --return-consumed-capacity TOTAL --endpoint-url http://localhost:$DB_SERVICE_PORT
aws dynamodb batch-write-item \
  --request-items file://./activities.json \
  --return-consumed-capacity TOTAL --endpoint-url http://localhost:$DB_SERVICE_PORT
