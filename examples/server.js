var fs = require('fs');
var http = require('http');

var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var serveStatic = require('serve-static')
var app = express();
var server = http.createServer(app);
var port = 6001;

app.use(bodyParser());

app.use("/", serveStatic(__dirname + "/../bower_components/"));
app.use("/", serveStatic(__dirname + "/../lib/"));
app.use("/", serveStatic(__dirname + "/"));
app.use("/templates/", serveStatic(__dirname + "/../templates/"));


router.post("/validate", function(req, res, next) {
    res.send(JSON.stringify({success: req.body.username === "pepe123"}));
    next();
});

app.use(router);


// Start up the server on the port specified in the config
server.listen(port, '0.0.0.0', port, function() {
});

console.log('Angular App Server - listening on port: ' + port);
