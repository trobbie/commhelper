const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:4002"
});

module.exports.docClient = new AWS.DynamoDB.DocumentClient();
