//Networks
var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');

var app = express();
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.use(favicon(__dirname + '/public/images/logo.png'));

var port = process.env.PORT || 3000;
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

app.get('/stats', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('stats');
});
