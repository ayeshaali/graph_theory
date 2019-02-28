var fs = require('fs');
var getNames = function(){
  var names = [];
  for (var i = 0; i<data.length; i++){
    var row = data[i].split(",");
    names.push(row[0]);
  }
  return names
}
var csvFunction = function() {
  for (var i = 1; i <data.length; i++){
    var row = data[i].split(",");
    var new_array = [];
    for(var empty = 0; empty<i-1; empty++){
      new_array.push(" ");
    }
    
    for (var j=i; j<data.length; j++){
      var count=0;
      var check_row = data[j].split(",");
      for (var index1 = 1; index1<row.length; index1++){
        for (var index2 = 1; index2<check_row.length; index2++){
          if (row[index1] == check_row[index2]){
            count++;
          }
        }
      }
      new_array.push(count);
    }
    json+=row[0]+","+new_array.toString();
    json+="\n"
  }
}

var jsonTarget = function() {
  var data = (fs.readFileSync("new_data.csv", "utf8")).split("\n");
  var json= "";
  for (var rowI=1; rowI<data.length-1; rowI++){
    var row = data[rowI].split(",");
    for (var column=rowI; column<row.length-1; column++){
      json+='{"source":' +(rowI-1)+',"target":'+(column-1)+',"weight":'+row[column]+'},'
      json+="\n"
    }
    fs.writeFileSync("somejson.txt", json, "utf8")
  }
}

var data = (fs.readFileSync("somejson.txt", "utf8")).split("\n");
var newtxt =""
for  (var i = 0; i<data.length; i++){
  if (data[i].includes('"weight":0')){
  } else {
    newtxt+=data[i]+"\n"
  }
}
fs.writeFileSync("new_json.txt", newtxt, "utf8")


