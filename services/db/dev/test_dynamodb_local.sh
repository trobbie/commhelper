#!/bin/bash

echo Testing that local DynamoDB server is running...
aws dynamodb list-tables --endpoint-url http://localhost:4002
echo Users table:
aws dynamodb scan --table-name Users --select "COUNT" --endpoint-url http://localhost:4002
echo Activities table:
aws dynamodb scan --table-name Activities --select "COUNT" --endpoint-url http://localhost:4002
