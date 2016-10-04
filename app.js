var express =  require("express");

var app = express();
var http = require("http");
var CONFIG = require("./config.json");

process.env.CONFIG = JSON.stringify(CONFIG);

var server = http.createServer(app);
server.listen(CONFIG.port);

console.log("It works !")
