var width = $(document).width(),
    height = 900

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("graphFile.json", function(error, json) {
  if (error) throw error;
  var force = d3.layout.force()
    .nodes(json.nodes)
    .links(json.links)
    .size([width, height])
    .gravity(0.08)
    .linkDistance(function(d) {
      console.log(d.source.id+" "+d.target.id+" "+d.cost)
      return (500-d.cost*80)
    })
    .linkStrength(1)
    .charge(-50)
    .chargeDistance(10)
    .start();

  var link = svg.selectAll(".link")
      .data(json.links)
      .enter().append("line")
      .attr("class", "link");

  var node = svg.selectAll(".node")
      .data(json.nodes)
      .enter().append("g")
      .attr("class", "node")
      .call(force.drag)
      .on("click", function(d){
        thisNode = d; // where nodeObject is the javascript object for the node, it's probably called "d" in your function.
        var connectedNodeIds = json.links
        .filter(x => x.source.id == d.id || x.target.id == d.id)
        .map(x => x.source.id == d.id ? x.target.id : x.source.id);
        
        d3.selectAll(".node")
        .selectAll("circle")
        .attr("fill", function(c) {
          console.log(connectedNodeIds);
          if (connectedNodeIds.indexOf(c.id) > -1 || c.id == d.id) return "red";
          else return "green";
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
          })
          .exit().remove();
        
        link.enter().append("line").attr("class", "link");
        });

  node.append("circle")
      .attr("r", 6)
      .attr("fill", "green")

  node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) { return d.label })
        .attr("class","label");

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  });
});
// 
// var simulation = d3.forceSimulation()
// .force("charge", d3.forceManyBody().strength(0))
// .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(200))
// .force("x", d3.forceX(width/2))
// .force("y", d3.forceY(height/2))
// .on("tick", ticked);
// 
// var link = svg.selectAll(".link"),
// node = svg.selectAll(".node");
// 
// d3.json("graphFile.json", function(error, graph) {
//   if (error) throw error;
// 
//   simulation.nodes(graph.nodes);
//   simulation.force("link").links(graph.links);
// 
//   link = link
//   .data(graph.links)
//   .enter().append("line")
//   .attr("stroke-width", function(d) { return (d.cost); })
//   .attr("class", "link");
// 
//   node = node
//   .data(graph.nodes)
//   .enter().append("g")
//   .attr("class", "node")
//   .call(d3.drag())
//   .on("click", function(d){
//     thisNode = d; // where nodeObject is the javascript object for the node, it's probably called "d" in your function.
//     d3.selectAll(".link")
//       .style("opacity",function(d) {
//           return d.source === thisNode || d.target === thisNode ? 1 : 0;
//       });
//   })
// 
//   node.append("circle")
//       .attr("r", 6)
//       .style("fill", "green");
// 
//   node.append("text")
//       .attr("dx", 12)
//       .attr("dy", ".35em")
//       .text(function(d) { return d.label });
// 
//   simulation
//   .nodes(graph.nodes)
//   .on("tick", ticked);
// 
//   simulation.force("link")
//   .links(graph.links);    
// });
// 
// function ticked() {
//   link.attr("x1", function(d) { return d.source.x; })
//   .attr("y1", function(d) { return d.source.y; })
//   .attr("x2", function(d) { return d.target.x; })
//   .attr("y2", function(d) { return d.target.y; });
// 
//   node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
//   // node.attr("cx", function(d) { return d.x; })
//   // .attr("cy", function(d) { return d.y; });
// }
// 
// 
// 
// function dragstarted(d) {
//   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//   d.fx = d.x;
//   d.fy = d.y;
// }
// 
// function dragged(d) {
//   d.fx = d3.event.x;
//   d.fy = d3.event.y;
// }
// 
// function dragended(d) {
//   if (!d3.event.active) simulation.alphaTarget(0);
//   d.fx = null;
//   d.fy = null;
// } 
