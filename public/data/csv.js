var fs = require('fs');
var out="\n";
data = (fs.readFileSync("final.txt", "utf8")).split("\n\n");

for (var i = 0; i < data.length; i++) {
  var row = (data[i]).split("\n");
  for (var x = 0; x < row.length; x++) {
    row[x] = row[x].trim();
  }
  var name = (row[0]).split(", ");
  var name_txt =""
  name_txt += name[1]+" "
  name_txt += name[0]
  row[0] = name_txt
  var result = false;
  if (row.includes("ADV. PHYSICS") || row.includes("INDEPENDENT BIOLOGY RESEARCH")) {
    if (row.includes("ADV. CHEMISTRY") || row.includes("CHEMISTRY 12")) {
      result=true
      console.log(true+" "+name_txt)
    }
  }
  
  for (var x = 0; x< row.length; x++) {
    if (row[x].includes("ENGLISH")) {
      var temp = row[1]
      row[1] = row[x]
      row[x] = temp
    } else if (row[x].includes("CHEM")) {
      var temp = row[2]
      row[2] = row[x]
      row[x] = temp
    } else if (row[x].includes("ADV. PHYSICS")) {
        if(result) {
          var temp = row[3]
          row[3] = row[x]
          row[x] = temp
        } else {
          var temp = row[2]
          row[2] = row[x]
          row[x] = temp
        }
    } else if (row[x].includes("RESEARCH")) {
        if(result) {
          var temp = row[3]
          row[3] = row[x]
          row[x] = temp
        } else {
          var temp = row[2]
          row[2] = row[x]
          row[x] = temp
        }
    }
  }
  out+=row.join(",");
  out+="\n"
}

fs.writeFileSync("data.csv", out, "utf8")
//   for (var k=0;k<arr.length;k++){
//     if(k == arr.length-1) {
//       out+=user_data[i][arr[k]];
//     } else {
//       out+=user_data[i][arr[k]]+",";
//     }
//   }
//   if (i!=user_data.length-1){
//     out+="\n";
//   }
// 
// }
// 
// }

