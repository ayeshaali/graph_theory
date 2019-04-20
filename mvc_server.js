//Networks
var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');

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

app.get('/stats', callName);

app.get('/stats', function(request, response){
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('stats');
});


function callName(req, res, callback) {
    var child_process = require("child_process"); 
    var spawn = child_process.spawn;
    var process = spawn('python',["models/python/graphdata.py"]); 
    var dataString = ""
    res.status(200);
    res.setHeader('Content-Type', 'text/html')
    process.stdout.on('data', function(data) { 
        dataString = data.toString('utf8')
        console.log(dataString)
        var new_data = dataString.split("yeet")
        res.render('stats', {data:new_data});
    })
} 
  
