var fs = require('fs');
var getNames = function(){
  var data = (fs.readFileSync("data.csv", "utf8")).split("\n");
  var names = [];
  for (var i = 0; i<data.length; i++){
    var row = data[i].split(",");
    names.push(row[0]);
  }
  return names
}

var csvFunction = function() {
  var data = (fs.readFileSync("data.csv", "utf8")).split("\n");
  json=" ,"
  json+=getNames().toString()
  json+="\n"
  
  for (var i = 0; i <data.length; i++){
    var row = data[i].split(",");
    var new_array = [];
    for(var empty = 0; empty<i; empty++){
      new_array.push(" ");
    }
    
    for (var j=i; j<data.length; j++){
      var count=0;
      var check_row = data[j].split(",");
      for (var index1 = 1; index1<row.length; index1++){
        for (var index2 = 1; index2<check_row.length; index2++){
          if (row[index1] == check_row[index2]){
            if (check_row[index2] == null||check_row[index2] ==""|| check_row[index2]==" "){
              
            } else {
              count++;
            }    
          }
        }
      }
      new_array.push(count);
    }
    json+=row[0]+","+new_array.toString();
    json+="\n"
  }
  fs.writeFileSync("new_data.csv", json, "utf8")
}

var jsonTarget = function() {
  var data = (fs.readFileSync("new_data.csv", "utf8")).split("\n");
  var json= "";
  for (var rowI=1; rowI<data.length; rowI++){
    var row = data[rowI].split(",");
    for (var column=rowI; column<row.length; column++){
      json+='{"source":' +(rowI)+',"target":'+(column)+',"cost":'+row[column]+'},'
      json+="\n"
    }
    fs.writeFileSync("somejson.txt", json, "utf8")
  }
}


var jsonFormatting = function() {
  var data = (fs.readFileSync("somejson.txt", "utf8")).split("\n");
  var newtxt =""
  for  (var i = 0; i<data.length; i++){
    if (data[i].includes('"cost":0')){
    } else {
      newtxt+=data[i]+"\n"
    }
  }
  fs.writeFileSync("new_json.txt", newtxt, "utf8")
}



// csvFunction()
// jsonTarget()
// jsonFormatting()