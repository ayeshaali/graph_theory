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



function callName(req, res) { 
      
    // Use child_process.spawn method from  
    // child_process module and assign it 
    // to variable spawn 
    var spawn = require("child_process").spawn; 
      
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    //    and arguments for the script  
      
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    var process = spawn('python',["./hello.py", 
                            req.query.firstname, 
                            req.query.lastname] ); 
  
    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    } ) 
} 
  
