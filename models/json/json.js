var fs = require('fs');

//array of names
var getNames = function(){
  var data = (fs.readFileSync("../data.csv", "utf8")).split("\n");
  var names = [];
  for (var i = 0; i<data.length; i++){
    var row = data[i].split(",");
    names.push(row[0]);
  }
  return names
}

//data.csv --> new_data.csv (csv with number of links between each person)
var csvFunction = function() {
  var data = (fs.readFileSync("../data.csv", "utf8")).split("\n");
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

//new_data.csv --> new_json.json (graphFile.json)
var jsonTarget = function() {
  var data = (fs.readFileSync("new_data.csv", "utf8")).split("\n");
  var json= "";
  
  var json='{"nodes":['
  json+="\n";
  
  var names= data[0].split(",");
  for(var i = 1; i<names.length; i++) {
    json+='{"label":"'+names[i]+'", "id":'+(i)+'},'
    json+="\n";
  }
  json+='],"links":[';
  
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
  fs.writeFileSync("new_json.json", newtxt, "utf8")
}

//data.csv --> key: class; value: array of students
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
  console.log(ordered);
  return ordered;
}

//makes classes.json (links by section)
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
  fs.writeFileSync("classes2.json", json, "utf8")
}

//classesStudents.json (key: full courses, value:array of students)--> json with links, no color, alphabetical
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

//takes a file that no longer exists and organizes by color--> courses1.json
var fixData = function() {
    var data = JSON.parse(fs.readFileSync("classesStudentsF.json", "utf8"));
    console.log(data);
    var new_obj = {
      red: [],
      orange:[],
      yellow:[],
      green:[],
      blue:[],
      purple:[],
      pink:[],
      brown:[]
    }
    for (var i = 0; i<Object.keys(data).length;i++){
      data[Object.keys(data)[i]].class=Object.keys(data)[i]
       new_obj[data[Object.keys(data)[i]]["color"]].push(data[Object.keys(data)[i]])
    }
    console.log(new_obj)
    new_obj= colorOrganize(new_obj, "orange")
    new_obj= colorOrganize(new_obj, "yellow")
    new_obj= colorOrganize(new_obj, "green")
    new_obj= colorOrganize(new_obj, "blue")
    new_obj= colorOrganize(new_obj, "purple")
    new_obj= colorOrganize(new_obj, "pink")
    new_obj= colorOrganize(new_obj, "brown")
    // console.log(new_obj)
    newNew = new_obj.red
    console.log(newNew)
    
    var json='{"nodes":['
    json+="\n";
    
    for(var i = 0; i<newNew.length; i++) {
      json+='{"label":"'+newNew[i].class+'", "id":"'+(i+1)+'","color":"'+newNew[i].color+'"},'
      json+="\n";
    }
    json+='],"links":[';
    
    for(var i = 0; i<newNew.length; i++) {
      var array1=newNew[i].arr
      for(var j = i+1; j<newNew.length; j++) {
        var array2=newNew[j].arr
        var array3=array1.filter(value => array2.includes(value))
        if (array3.length!=0) {
          json+='{"source":'+i+',"target":'+j+',"cost":'+array3.length+'},';
          json+="\n";
        }
      }
    }
    json+="]}"
    fs.writeFileSync("courses.json", json, "utf8")

}

//organize by Color
var colorOrganize = function (new_obj, color) {
  for (var i = 0; i<new_obj[color].length;i++){
     new_obj["red"].push(new_obj[color][i])
  }
  delete new_obj[color]
  return new_obj
}

//make python dictionary (students)
var pythonDic = function() {
  var data = (fs.readFileSync("../data.csv", "utf8")).split("\n");
  json="{\n"
  
  for (var i = 0; i <data.length; i++){
    var row = data[i].split(",");
    json+='"'+row[0]+'": ['
    for (var j=0; j<data.length; j++){
      var check=true;
      if (j!=i){
        var check_row = data[j].split(",");
        
        for (var index1 = 1; index1<row.length; index1++){
          for (var index2 = 1; index2<check_row.length; index2++){
            if (check==true){
            if ((row[index1]).trim() == (check_row[index2]).trim()){
              if (check_row[index2] == null||check_row[index2]==""|| check_row[index2]==" "){
                console.log("empty")
              } else {
                console.log("."+index1+": "+check_row[index2]+".")
                json+='"'+check_row[0]+'",';
                check=false;
                break;
              }
            }
          }
        }
      }
      }
    }
    json+="],\n"
  }
  json+="}"
  fs.writeFileSync("graph_data.txt", json, "utf8")
  
}

//make python dictionary (courses)
var pythonCourses = function() {
  var ordered = JSON.parse(fs.readFileSync("classesStudents.json", "utf8"));
  for (var i = 0; i<Object.keys(ordered).length;i++){
    var arr = ordered[Object.keys(ordered)[i]].sort();
    ordered[Object.keys(ordered)[i]]=arr
  }
  json="{\n"
  
  for(var i = 0; i<Object.keys(ordered).length; i++) {
    var array1=ordered[Object.keys(ordered)[i]]
    json+='"'+Object.keys(ordered)[i]+'": ['
    for(var j =0; j<Object.keys(ordered).length; j++) {
      if (j!=i){
        var array2=ordered[Object.keys(ordered)[j]]
        var array3=array1.filter(value => array2.includes(value))
        if (array3.length!=0) {
            json+='"'+Object.keys(ordered)[j]+'",';
        }
      }
    }
    json+="],\n"
  }
  json+="}"
  fs.writeFileSync("graphCourses.txt", json, "utf8")
}

exports.degree = function(data_file,name) {
  var data = (fs.readFileSync(data_file, "utf8")).split("\n");
  var names = {};
  for (var i = 0; i<data.length; i++){
    var row = data[i].split(",");
    console.log(row[0].toLowerCase());
    names[row[0].toLowerCase()]=row[1];
  }
  return ("Degree of Vertex "+name+": "+names[name.toLowerCase()]) 
}