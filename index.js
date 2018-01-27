var express = require('express');
var Promise = require('promise');
var bodyParser = require("body-parser");

var getDockerStats = require('./dlg/GetDockerStatsDelegate');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, GoogleIdToken");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  next();
});
app.use(bodyParser.json());
app.use(express.static('/app'));

app.get('/', function(req, res) {res.send({api: 'api-discovery', status: 'running'});});
app.get('/stats', function(req, res) {getDockerStats.getDockerStats().then(function(result) {res.send(result);});});

app.listen(8080, function() {
  console.log('Docker Stats Microservice up and running');
});
