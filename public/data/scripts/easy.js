var fs = require('fs');
var json = fs.readFileSync("12grade.json", "utf8");
var obj = JSON.parse(json);
var names= Object.keys(obj)
var colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"]
for (var i=0; i<names.length; i++) {
  var total_class_arr = []
  for (var j =0; j<colors.length;j++){
    for (var k =0; k<6; k++) {
      if (obj[names[i]][colors[j]]["US "+k] != null){
        var class_arr = obj[names[i]][colors[j]]["US "+k]["categories"]
        total_class_arr.push(class_arr)
      }
    }
  }
  var unique = [...new Set(total_class_arr.map(item => item[2]))];
  var unique2 = unique.filter(item => item!='Advising');
  for (var j =0; j<colors.length;j++){
    delete obj[names[i]][colors[j]];
  }
  obj[names[i]]["classes"] = unique2;
}
console.log(obj)

// var json = JSON.stringify(obj)
// 
// fs.writeFileSync("12grade.json", json, "utf8")