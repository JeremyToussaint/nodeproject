'use strict'

var express = require("express");
var router = express.Router();

module.exports = router;

// router.put("hello world");
router.get(function(req, resp) {
	resp.end("Hello world !");
});