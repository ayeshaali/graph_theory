var width = $(document).width()*.7,
    height = 800

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("position", "absolute")
    .style("top", "9em")
    .style("border-style", "solid")
    .style("background-color", "#FFFFFF");

d3.json("graphFile.json", function(error, json) {
  if (error) throw error;
  var force = d3.layout.force()
    .nodes(json.nodes)
    .links(json.links)
    .size([width-20, height])
    .gravity(0.08)
    .linkDistance(function(d) {
      return (500-d.cost*80)
    })
    .linkStrength(1)
    .charge(-80)
    .chargeDistance(100)
    .start();

  var link = svg.selectAll(".link")
      .data(json.links);
      
  link.enter().append("line").attr("class", "link").style("stroke-width", function(d){
    return d.cost;
  });
  
  var node = svg.selectAll(".node")
      .data(json.nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(force.drag)
      .on("click", function(d){
        thisNode = d; // where nodeObject is the javascript object for the node, it's probably called "d" in your function.
        $("#info").html("<h2>"+d.label+"</h2>"); 
        $("#info").append("<table><tr><th>Student</th><th>Number of Classes Shared</th></tr>"); 
        console.log($("#info"));
        for(var i=0; i<json.links.length; i++) {
          if (json.links[i].source === thisNode && json.links[i].target===thisNode) {
          } else if (json.links[i].source === thisNode) {
            if (json.links[i].cost > 2){
                $("#info table").append("<tr><td>"+json.links[i].target.label+"</td><td>"+json.links[i].cost+"</td></tr>")
            }
          } else if (json.links[i].target===thisNode) {
            if (json.links[i].cost > 2){
              $("#info table").append("<tr><td>"+json.links[i].source.label+"</td><td>"+json.links[i].cost+"</td></tr>")     
              console.log($("#info"));
            } 
          }
          if (i== json.links.length-1) {
            $("#info").append("</table>"); 
          }
        }
        var connectedNodeIds = json.links
        .filter(x => x.source.id == d.id || x.target.id == d.id)
        .map(x => x.source.id == d.id ? x.target.id : x.source.id);
        
        d3.selectAll(".node")
        .selectAll("circle")
        .attr("fill", function(c) {
          if (connectedNodeIds.indexOf(c.id) > -1 || c.id == d.id) return "green";
          else return "red";
        });
        
        var link = d3.selectAll(".link")
          .data(function(){
            var newobj = []
            for(var i=0; i<json.links.length; i++) {
              if (json.links[i].source === thisNode || json.links[i].target===thisNode) {
                newobj.push(json.links[i]);
              }
            }
            return newobj;
          });
          link.exit().remove();
          
          var colors= ["#3D88EE", "#0656D9", "#032470", "#001A50", "#050934"]
          d3.selectAll(".link")
          .attr("class","link")
          .style("stroke-width", function(d){
            return d.cost*1.5;
          })
          .style("stroke", function(d){
            return colors[d.cost-1];
          })
          $('#reset').css('top', $("#info").position().top + $("#info").height()+ 50);

        });

  node.append("circle")
      .attr("r", 6)
      .attr("fill", "green")

  node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.label })
        .attr("class","label")
        .style("font-weight", "100")
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