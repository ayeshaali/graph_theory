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
          if ((row[index1]).trim() == (check_row[index2]).trim()){
            if (check_row[index2] == null||check_row[index2]==""|| check_row[index2]==" "){
              console.log("empty")
            } else {
              console.log("."+index1+": "+check_row[index2]+".")
              count++;
            }
          }
        }
      }
      console.log(row[0]+" "+check_row[0]+": "+count);
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
    for (var column=rowI+1; column<row.length; column++){
      json+='{"source":' +(rowI-1)+',"target":'+(column-1)+',"cost":'+row[column]+'},'
      json+="\n"
    }
  }
  var data = json.split("\n");
  var newtxt =""
  for  (var i = 0; i<data.length; i++){
    if (data[i].includes('"cost":0')){
    } else {
      newtxt+=data[i]+"\n"
    }
  }
  fs.writeFileSync("new_json.txt", newtxt, "utf8")
}

var classes = function() {
  var ordered = classesOrdered();
  var json='{"nodes":['
  json+="\n";
  
  for(var i = 0; i<Object.keys(ordered).length; i++) {
    json+='{"label":"'+Object.keys(ordered)[i]+'", "id":"'+(i+1)+'"},'
    json+="\n";
  }
  json+='],"links":[';
  
  for(var i = 0; i<Object.keys(ordered).length; i++) {
    var array1=ordered[Object.keys(ordered)[i]]
    for(var j = i+1; j<Object.keys(ordered).length; j++) {
      var array2=ordered[Object.keys(ordered)[j]]
      var array3=array1.filter(value => array2.includes(value))
      if (array3.length!=0) {
        json+='{"source":'+i+',"target":'+j+',"cost":'+array3.length+'},';
        json+="\n";
      }
    }
  }
  json+="]}"
  fs.writeFileSync("classes.json", json, "utf8")
}
// csvFunction()
// // jsonTarget()
// classes()

var studentC = function() {
  var ordered = JSON.parse(fs.readFileSync("classesStudents.json", "utf8"));
  for (var i = 0; i<Object.keys(ordered).length;i++){
    var arr = ordered[Object.keys(ordered)[i]].sort();
    ordered[Object.keys(ordered)[i]]=arr
  }
  var json='{"nodes":['
  json+="\n";
  
  for(var i = 0; i<Object.keys(ordered).length; i++) {
    json+='{"label":"'+Object.keys(ordered)[i]+'", "id":"'+(i+1)+'"},'
    json+="\n";
  }
  json+='],"links":[';
  
  for(var i = 0; i<Object.keys(ordered).length; i++) {
    var array1=ordered[Object.keys(ordered)[i]]
    for(var j = i+1; j<Object.keys(ordered).length; j++) {
      var array2=ordered[Object.keys(ordered)[j]]
      var array3=array1.filter(value => array2.includes(value))
      if (array3.length!=0) {
        json+='{"source":'+i+',"target":'+j+',"cost":'+array3.length+'},';
        json+="\n";
      }
    }
  }
  json+="]}"
  fs.writeFileSync("classesStudentsF.json", json, "utf8")

}

var classesOrdered = function() {
  var data = (fs.readFileSync("../data.csv", "utf8")).split("\n");
  var classObj = {}
  for (var i=0;i<data.length;i++) {
    var row = data[i].split(",");
    for (var j=1; j<row.length;j++) {
      if (classObj[row[j].trim()]==null) {
        var arr =[];
        arr.push(row[0]);
        classObj[row[j].trim()]=arr
      } else {
        classObj[row[j].trim()].push(row[0]);
      }
    }
  }
  var ordered ={};
  Object.keys(classObj).sort().forEach(function(key) {
    ordered[key] = classObj[key];
  })
  delete ordered[""]
  return ordered;
}

studentC();