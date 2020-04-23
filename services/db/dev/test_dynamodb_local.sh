#!/bin/bash

. config.db.service

echo Testing that local DynamoDB server is running...
aws dynamodb list-tables --endpoint-url http://localhost:$DB_SERVICE_PORT
echo Users table:
aws dynamodb scan --table-name Users --select "COUNT" --endpoint-url http://localhost:$DB_SERVICE_PORT
echo Activities table:
aws dynamodb scan --table-name Activities --select "COUNT" --endpoint-url http://localhost:$DB_SERVICE_PORT
