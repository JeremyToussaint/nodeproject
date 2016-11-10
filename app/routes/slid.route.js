var multer = require("multer");
var slidController = require("./../controllers/slid.controller.js");
var express = require("express");
var router = express.Router();
module.exports = router;

var multerMiddleware = multer({ "dest": "/tmp/"});

router.post("/slids", multerMiddleware.single("file"), function(request, response) {
	console.log(request.file.path);
	console.log(request.file.orginalname);
	console.log(request.file.mimetype);
});

router.get("/slids", function(req, resp) {

})