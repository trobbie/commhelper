var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render("index", { title: "Commhelper API Entry Point" })
});

module.exports = router;
