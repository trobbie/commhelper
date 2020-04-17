#!/bin/bash

aws dynamodb batch-write-item \
  --request-items file://./users.json \
  --return-consumed-capacity TOTAL --endpoint-url http://localhost:4002
aws dynamodb batch-write-item \
  --request-items file://./activities.json \
  --return-consumed-capacity TOTAL --endpoint-url http://localhost:4002
