var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2 - 25,
    pi = Math.PI

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(0)
    .startAngle(function(d){ return d.startAngle - pi / 6 })
    .endAngle(function(d){ return d.endAngle - pi / 6 });

var labelArc = d3.svg.arc()
    .outerRadius(radius + 20)
    .innerRadius(radius + 5);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select(".occupations").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// making striped pattern
svg
  .append('defs')
  .append('pattern')
    .attr('id', 'rightStripes')
    .attr('patternUnits', 'userSpaceOnUse')
    .attr('width', 10)
    .attr('height', 10)
  .append('path')
    .attr('d', 'M0,0 l10,10')
    .attr('stroke', '#AE9C8C')
    .attr('stroke-width', 1);

d3.csv("data.csv", type, function(error, data) {
  if (error) throw error;

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) {
        if (d.data.race == "black") { return "black"; }
        else { return "#BFAEA1"; }
      })
      .attr("stroke-width", 0);

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d){
        if (d.data.race == "white") { return "url(#rightStripes)" }
      })
      .attr("stroke-width", 0);

  var t = g.append("text")
      .attr("transform", function(d, i) { console.log(d); console.log(labelArc.centroid(d)); return "translate(" + labelArc.centroid(d) + ")rotate(" + angle(d, i) + ")"; })
      .text(function(d, i) {
        if (i % 2 == 0){ return d.data.occupation; }
      });

  function angle(d, i) {
    var a = i * 30;
    return a > 90 && a < 270 ? a - 180 : a;
  }

});

function type(d) {
  d.population = +d.population;
  return d;
}
