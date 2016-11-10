'use strict'

// REQUIRE
var express = require("express");
var http = require("http");
var path = require("path");
var fs = require("fs");
var bodyParser = require('body-parser');

var CONFIG = require("./config.json");
process.env.CONFIG = JSON.stringify(CONFIG);

var defaultRoute = require("./app/routes/default.route.js");
var slidRoute = require("./app/routes/slid.route.js");
// INIT APP
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var server = http.createServer(app);
server.listen(CONFIG.port);

// ROUTES
app.use("/", defaultRoute);

// app.get("/", function(request, response) {
//     response.send("It works");
// });

app.use("/admin", express.static(path.join(__dirname, "public/admin")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));

app.get("/loadPres", function(request, response) {
    var tab = {};

    function loadPres(file, length) {
        if (file.indexOf("json") != -1) {
            fs.readFile(path.join(CONFIG.presentationDirectory, file), function(err, data) {
                var obj;
                if (err) {
                    response.status(500).end("Probleme à l'enregistrement du fichier");
                } else {
                    obj = JSON.parse(data);
                    // tab[tab.length] =  { key: tab.length, value: obj};
                    tab[obj.id] = obj;

                    // if(tab.length == length) 
                    console.log(Object.keys(tab).length);
                    if (Object.keys(tab).length == length) {
                        console.log(JSON.stringify(tab));
                        response.end(JSON.stringify(tab));
                    }
                }
            });
        }

    }


    fs.readdir(CONFIG.presentationDirectory, function(err, data) {
        for (var i = 0; i < data.length; i++) {
            loadPres(data[i], data.length);
        }
        // data.forEach(loadPres);	
    });

});

app.post("/savePres", function(request, response) {

    var pathFile = path.join(CONFIG.presentationDirectory, request.body.id + ".pres.json");
    console.log(request.body)
        // console.log(path.join(CONFIG.presentationDirectory, donnees.id.toString() +".pres.json"));
    fs.writeFile(pathFile, JSON.stringify(request.body), function(err, data) {
        if (err) {
            response.status(500).end("Probleme à l'enregistrement du fichier");
        };
        console.log("File saved");
    });
});
