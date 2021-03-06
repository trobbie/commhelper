var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-east-1",
  endpoint: "http://localhost:4002"
});

var dynamodb = new AWS.DynamoDB();
var params = {
    TableName : "Activities"
};
dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
