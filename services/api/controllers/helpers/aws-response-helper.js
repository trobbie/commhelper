// const docClient = require('../../db_client');
const docClient = require('../../db-service.js').docClient;

const doScan = (params, res) => {
  docClient.scan(params, (err, data) => {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      res.send(data.Items);
      // print all entities
      console.debug("Scan succeeded.");
      data.Items.forEach(function(entity) {
        console.debug(entity.id)
      });
      if (typeof data.LastEvaluatedKey != "undefined") {
        console.debug("Scanning for more...");
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        docClient.scan(params, onScan);  // recursive
      }
    }
  });
};

const doQuery = (params, res) => {
  docClient.query(params, function(err, data) {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.debug("Query succeeded.");
      res.send(data.Items)
      data.Items.forEach(function(entity) {
          console.debug(entity.id);
      });
    }
  });
}

const doPut = (params, res, entity) => {
  docClient.put(params, function(err, data) {
    if (err) {
      console.error("Unable to update. Error:", JSON.stringify(err, null, 2));
    } else {
      // res.sendStatus(200);
      res.send(JSON.stringify(entity));
    }
  });
}

module.exports = {
  doScan: doScan,
  doQuery: doQuery,
  doPut: doPut
};