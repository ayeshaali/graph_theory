//Networks
var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
var child_process = require("child_process")

var app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var Data = require(__dirname +'/models/json/json');
// app.use(favicon(__dirname + '/public/images/logo.png'));

var port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log('Server started at '+ new Date()+', on port ' + port+'!');
});

//first request, renders index
app.get('/', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user:"graphFile.json", mode:""});
});

app.get('/students', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user:"graphFile.json",mode:""});
});

app.get('/courses', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user:"courses1.json",mode:""});
});

app.get('/coursesArc', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user:"courses1.json", mode:"arc"});
});

app.get('/classes', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index', {user:"classes.json",mode:""});
});

app.get('/stats', function (req, res){
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  var categories = ["Number of Vertices", "Number of Edges (Connections)", "Minimum Vertex Degree: ", "Maximum Vertex Degree: ", "Density of Graph: ", "Is The Graph Connected?: ", "Average Vertex Degree: "]
  var graph1 = ["106", "2522", "26", "65", "0.4531895777178796", "True", "47"]
  var graph2 = ["61", "539", "4", "60", "0.29453551912568304", "True", "17"]
  var obj = {
    "column1":categories,
    "column2":graph1,
    "column3":graph2
  }
    res.render('stats', {data:obj, search:""});
  });

app.get('/search', function (request, response) {
  var categories = ["Number of Vertices", "Number of Edges (Connections)", "Minimum Vertex Degree: ", "Maximum Vertex Degree: ", "Density of Graph: ", "Is The Graph Connected?: ", "Average Vertex Degree: "]
  var graph1 = ["106", "2522", "26", "65", "0.4531895777178796", "True", "47"]
  var graph2 = ["61", "539", "4", "60", "0.29453551912568304", "True", "17"]
  var obj = {
    "column1":categories,
    "column2":graph1,
    "column3":graph2
  }
  var dataString1 = Data.degree(__dirname+"/models/degrees.csv", request.query.name)
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('stats', {data:obj, search:dataString1});
});
  
