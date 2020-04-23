#!/bin/bash

aws dynamodb delete-table --table-name Users --endpoint-url http://localhost:$DB_SERVICE_PORT
aws dynamodb create-table --cli-input-json file://./users.json --endpoint-url http://localhost:$DB_SERVICE_PORT

aws dynamodb delete-table --table-name Activities --endpoint-url http://localhost:$DB_SERVICE_PORT
aws dynamodb create-table --cli-input-json file://./activities.json --endpoint-url http://localhost:$DB_SERVICE_PORT
