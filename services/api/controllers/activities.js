const awsRespHelper = require('./helpers/aws-response-helper.js');
const respHelper = require('./helpers/response-helper.js');

/* GET activities listing. */
function getActivities(req, res, next) {
  console.log("Request (GET): Getting all entities from database table");

  const awsParams = {
    TableName: "Activities",
    ProjectionExpression: "#id, #name, #dateCreated",
    ExpressionAttributeNames: {
      "#id": "id",
      "#name": "name",
      "#dateCreated": "dateCreated"
    }
  };
  awsRespHelper.doScan(awsParams, res);
};

function getActivity(req, res, next) {
  var entityId = parseInt(req.params.id);
  // var entityId = parseInt(req.url.slice(1));
  console.log("Request (GET): Getting entity '" + entityId + "' from database");
  console.log("req:", req.params);
  console.log("url:", req.url);

  var awsParams = {
    TableName : "Activities",
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames:{
        "#id": "id"
    },
    ExpressionAttributeValues: {
        ":id": entityId
    }
  };
  awsRespHelper.doQuery(awsParams, res);
};

function putActivity(req, res, next) {
  let entityId = parseInt(req.url.slice(1));
  console.log("Request (PUT): Putting entity '" + entityId + "' into database");

  let activity = req.body;  // already parsed into object

  if (req.headers['content-type'] !== 'application/json') {
    respHelper.sendError(next, 400, "Request content type is '" + req.headers['content-type'] + "'.  Expected 'application/json'");
    return;
  }

  if (Object.keys(activity).length === 0 && activity.constructor === Object) {
    respHelper.sendError(next, 400, "No request body found.  Encoding: " + req);
    return;
  }

  if (entityId !== activity.id) {
    respHelper.sendError(next, 400, "The 'id' in URI ('" + entityId + "') does not match 'id' in request body ('" + activity.id +  "').");
    return ;
  }

  if (!activity.name) {
    respHelper.sendError(next, 400, "The 'name' in the request body has no value.");
    return ;
  }

  if (!activity.dateCreated instanceof Date) {
    respHelper.sendError(next, 400, "The 'dateCreated' in request body is not a date.");
    return ;
  }
  
  var awsParams = {
      TableName: "Activities",
      Item: {
          "id": activity.id,
          "name": activity.name,
          "dateCreated": activity.dateCreated
      }
  };
  awsRespHelper.doPut(awsParams, res, activity);
};

module.exports = { getActivities, getActivity, putActivity };
