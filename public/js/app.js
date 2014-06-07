


var data = [
];

var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select("body").append("svg")
			.attr("height", height)
			.attr("width", width);


var generateData = function(){
  
	for(var i = 0; i < 100; i++)
	{
		var imageUrl = "http://www.e-pint.com/epint.jpg"
	   var x = Math.floor((Math.random() * width) + 1);
	   var y = Math.floor((Math.random() * height) + 1);	   
	   var size = Math.floor((Math.random() * 50) + 1);	
	   var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';   
	   var c = { r: size, cx: x, cy: y, color: color, img:imageUrl};

	   data.push(c);
	}

}

var cats = {};
var circles = {};

var draw = function(){
	

	svg.append("g").selectAll("rect").data(data)
		.enter()
		.append("rect")
		.attr({
		   x: function(d,i){ return i * d.r; },
		   y: function(d,i){ return height - d.cy;},
		   width: function(d,i) { return i * d.r},
		   height: function(d,i) { return d.cy; },
		   fill: function(d){ return d.color;}
		});



	cats = svg.selectAll("g").data(data)
		.enter()
		.append("g")
		.attr({
		    "x": function(d){ return d.cx;},
		    "y": function(d){ return d.cy;},
		    "width": function(d) { return d.r * 2},
		    "height": function(d) { return d.r * 2}
		});
	


	circles = cats.append("circle")
		    .attr({
	                   r: function(d){ return d.r; },
			   cx: function(d){ return d.cx;},
			   cy: function(d){ return d.cy;},
			   fill: function(d) { return d.color;}
		 })

	/*cats.append("image").attr("xlink:href", "https://github.com/favicon.ico")
		    .attr("x", function(d){ return d.cx - d.r;} )
		    .attr("y", function(d){ return d.cy - d.r;})
		    .attr("width", function(d) { return d.r * 2})
		    .attr("height", function(d) { return d.r * 2})
		    .attr("fill", function(d) { return d.color;})*/
		

}

var reset = function(){

	data = [];
	
	svg.selectAll("circle").data(data)
		.exit()
		.remove();
	
	console.log("drawing");
	generateData();

	draw();
	
}

reset();

var startAnimation = function(){

	
	console.log("moving");
        circles.transition()
		.duration(2000)
		.attr({
		   r: function(d){
			var num = Math.floor((Math.random() * (d.r + 10)) + 1);
			num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

			d.r = d.r + num;

			if(d.r < 0)
			{
			  d.r *= -1;
			}
		
			return d.r;
		   },
		height: function(d){
			var num = Math.floor((Math.random() * (d.r + 10)) + 1);
			num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

			d.r = d.r + num;

			if(d.r < 0)
			{
			  d.r *= -1;
			}
		
			return d.r;
		   }
		});

	setTimeout(startAnimation, 1000);
}

startAnimation();








