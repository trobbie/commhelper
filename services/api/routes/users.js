const express = require('express');
const router = express.Router();

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   const userParams = {
//     TableName: "Users",
//     ProjectionExpression: "#id, #name, #email, #permissionLevel",
//     ExpressionAttributeNames: {
//       "#id": "id",
//       "#name": "name",
//       "#email": "email",
//       "#permissionLevel": "permissionLevel"
//     }
//   };
//   console.log("Scanning Users table.");
//   awsHelper.doScan(userParams, res);
// });

// router.get('/:id', function (req, res) {
//   var entityId = parseInt(req.url.slice(1));
//   console.log(req.url)
//   console.log(entityId)
//   var params = {
//     TableName : "Users",
//     KeyConditionExpression: "#id = :id",
//     ExpressionAttributeNames:{
//         "#id": "id"
//     },
//     ExpressionAttributeValues: {
//         ":id": entityId
//     }
//   };
//   awsHelper.doQuery(params, res);
// });

module.exports = router;
