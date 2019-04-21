//Networks
var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
var child_process = require("child_process")

var app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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
  var spawn = child_process.spawn;
  var process = spawn('python',["models/python/graphdata.py"]);
  res.status(200);
  res.setHeader('Content-Type', 'text/html')
  process.stdout.on('data', function(data) { 
    var dataString1 = data.toString('utf8').split("Column2")
    var dataString2 = dataString1[1].split("Column3")
    var column1 = dataString1[0].split("yeet")
    var column2 = dataString2[0].split("yeet")
    var column3 = dataString2[1].split("yeet")
    var obj = {
      "column1":column1,
      "column2":column2,
      "column3":column3
    }
    res.render('stats', {data:obj, search:""});
  })
});

app.get('/search', function (request, response) {
  var spawn = child_process.spawn;
  var process = spawn('python',["models/python/graphdata.py", '"'+request.query.name+'"']);
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  process.stdout.on('data', function(data) {
      var dataString1 = data.toString('utf8').split("yeet") 
      response.render('stats', {data:dataString1, search:""});
  })
});
  
