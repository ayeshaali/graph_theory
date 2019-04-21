var svgFunction = function(json_file) {
  var margin = {top: 0, right: 80, bottom: 50, left: 60}
  var width = $(document).width(),
      height = 800
  // append the svg object to the body of the page
  var svg = d3.select("body")
    .append("svg")
    .attr("id", json_file)
    .attr("width", width)
    .attr("height", height + 200)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Read dummy data
  d3.json(json_file, function( data) {

    // List of node names
    var allNodes = data.nodes.map(function(d){return d.label})

    // A linear scale to position the nodes on the X axis
    var x = d3.scalePoint()
      .domain(allNodes)
      .range([5, width-100])

    var idToNode = {};
    data.nodes.forEach(function (n) {
      idToNode[n.id] = n;
    });
    console.log(idToNode);


    // Add the links
    var links = svg
      .selectAll('mylinks')
      .data(data.links)
      .enter()
      .append('path')
      .attr('d', function (d) {
        start = x(idToNode[d.source+1]["label"])    // X position of start node on the X axis
        end = x(idToNode[d.target+1]["label"])      // X position of end node
        console.log(start+" "+end)
        return ['M', start, height-30,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
          'A',                            // This means we're gonna build an elliptical arc
          (start - end)/2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
          (start - end)/2, 0, 0, ',',
          start < end ? 1 : 0, end, ',', height-30] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
          .join(' ');
      })
      .style("fill", "none")
      .attr("stroke", "grey")
      .style("stroke-width", function(d){
        return d.cost;
      })

    // Add the circle for the nodes
    var nodes = svg
      .selectAll("mynodes")
      .data(data.nodes.sort(function(a,b) { return +b.id - +a.id }))
      .enter()
      .append("circle")
        .attr("cx", function(d){ return(x(d.label))})
        .attr("cy", height-30)
        .attr("r", function(d){ return(5)})
        .attr("stroke", "white")
        .attr("fill", function(d){return(d.color)})

    // And give them a label
    var labels = svg
      .selectAll("mylabels")
      .data(data.nodes)
      .enter()
      .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .text(function(d){ return(d.label)} )
        .style("text-anchor", "end")
        .attr("transform", function(d){ return( "translate(" + (x(d.label)) + "," + (height-15) + ")rotate(-50)")})
        .style("font-size", 12)

    // Add the highlighting functionnality
    nodes
      .on('click', function (d) {
        // Highlight the nodes: every node is green except of him
        nodes
          .style('opacity', .2)
        d3.select(this)
          .style('opacity', 1)
        // Highlight the connections
        links
          .style('stroke-opacity', function (link_d) { return link_d.source === d.id-1 | link_d.target === d.id-1 ? 1 : 0;})
          .style('stroke', function (link_d) {
              if(link_d.source === d.id-1){
                console.log(d.id)
                return idToNode[link_d.target+1]["color"]
              } else if( link_d.target === d.id-1) {
                  console.log(d.id)
                return idToNode[link_d.source+1]["color"]
              } else {
                return 0
              }
            })
          .style('stroke-width', function (link_d) { return link_d.source === d.id-1 | link_d.target === d.id-1 ? (link_d.cost).map(0,50,1,25) : 0;})
          
            
        labels
          .style("font-size", function(label_d){ return label_d.label === d.label ? 16 : 12 } )
          .style("font-weight", function(label_d){ return label_d.label === d.label ? "bold" : "normal" } )
      });

  })
}

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

