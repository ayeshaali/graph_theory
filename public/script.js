var svgFunction = function(json_file) {
  var width = $(document).width()*.7,
      height = 800

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("id", json_file)
      .style("position", "absolute")
      .style("top", "9em")
      .style("border-style", "solid")
      .style("background-color", "#FFFFFF");
    
  var num = 2;  
  if (json_file=="courses1.json") {
    num = 10;
  }
  
  d3.json(json_file, function(error, json) {
    if (error) throw error;
    
    var force = d3.layout.force()
      .nodes(json.nodes)
      .links(json.links)
      .size([width-20, height])
      .gravity(.1)
      .linkDistance(function(d) {
        if (d.cost < 11) {
          return (600-d.cost*60)
        } else {
          return (700-d.cost*40)
        }
      })
      .linkStrength(0.1)
      .charge(function (d) {
        if (d.cost < 15) {
          return -100
        } else {
          return -1000
        }
      })
      .chargeDistance(100)
      .start();

    var link = svg.selectAll(".link")
        .data(json.links);
        
    link.enter().append("line").attr("class", "link").style("stroke-width", function(d){
      if (json_file=="courses1.json") {
        return d.cost/2;
      } else {
        return d.cost;
      }
    });
    
    var node = svg.selectAll(".node")
        .data(json.nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(force.drag)
        .on("click", function(d){
          thisNode = d; // where nodeObject is the javascript object for the node, it's probably called "d" in your function.
          $("#info").html("<h2>"+d.label+"</h2>"); 
          $("#info").append("<table id = 'info-table'><tr><th>Student</th><th>Number of Classes Shared</th></tr>"); 
          for(var i=0; i<json.links.length; i++) {
            if (json.links[i].source === thisNode && json.links[i].target===thisNode) {
            } else if (json.links[i].source === thisNode) {
              if (json.links[i].cost > num){
                  $("#info table").append("<tr><td>"+json.links[i].target.label+"</td><td>"+json.links[i].cost+"</td></tr>")
              }
            } else if (json.links[i].target===thisNode) {
              if (json.links[i].cost > num){
                $("#info table").append("<tr><td>"+json.links[i].source.label+"</td><td>"+json.links[i].cost+"</td></tr>")     
              } 
            }
            if (i== json.links.length-1) {
              $("#info").append("</table>"); 
            }
          }
          
          
          sortTable()
          var connectedNodeIds = json.links
          .filter(x => x.source.id == d.id || x.target.id == d.id)
          .map(x => x.source.id == d.id ? x.target.id : x.source.id);
          
          d3.selectAll(".node")
          .selectAll("circle")
          .attr("fill", function(c) {
            if (connectedNodeIds.indexOf(c.id) > -1 || c.id == d.id) return "green";
            else return "red";
          });
          
          svg.selectAll(".link").remove();
          link = svg.selectAll(".link").data(json.links.filter(x => x.source.id == d.id || x.target.id == d.id));
              
          link.enter().append("line").attr("class", "link").style("stroke-width", function(d){
            if (json_file=="courses1.json") {
              return d.cost/2;
            } else {
              return d.cost;
            }
          });
          
            var colors= ["#3D88EE", "#0656D9", "#032470", "#001A50", "#050934"]
            
            d3.selectAll(".link")
            .style("stroke-width", function(d){
              return d.cost*1.5;
            })
            .style("stroke", function(d){
              return colors[d.cost-1];
            })
            $('#reset').css('top', $("#info").position().top + $("#info").height()+ 50);
            $('#stats').css('top', $("#info").position().top + $("#info").height()+ 50);
          });

    node.append("circle")
        .attr("r", 6)
        .attr("fill", function(d){
          if(d.color !=null) {
            return d.color;
          } else {
            return "black"
          }
        })

    node.append("text")
          .attr("dx", 12)
          .attr("dy", ".35em")
          .text(function(d) { return d.label })
          .attr("class","label")
          .style("font-cost", "100")
          .style("font-size", "13px")
          .style("font-variant", "small-caps");

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });
  });
}

function sortTable() {
  console.log("sorting")
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("info-table");
  
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      //check if the two rows should switch place:
      if (parseInt(x.innerHTML)< parseInt(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// svgFunction("graphFile.json")