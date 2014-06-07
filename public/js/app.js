


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
	   var red = Math.floor(Math.random() * 256);
	   var green = Math.floor(Math.random() * 256);
	   var blue = Math.floor(Math.random() * 256);
	
	   var color = 'rgb(' + red + ',' + green + ',' + blue + ')';   
	   var c = { 
			r: size, 
			cx: x, 
			cy: y, 
			red: red, 
			green: green, 
			blue: blue, 
			color: color, 
			img:imageUrl
		};

	   data.push(c);
	}

}

var cats = {};
var circles = {};

var backgroundTables = {};

var draw = function(){
	

	backgroundTables = svg.append("g").selectAll("rect").data(data)
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
			   fill: function(d) { return d.color;},
			   "fill-opacity": 0.8
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
		   fill: function(d){
			var num = Math.floor((Math.random() * (d.r + 3)) + 1);
			num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
			
			d.red = d.red + num;
			d.blue = d.blue + num;
			d.green = d.green + num;

                        if(d.red > 255 || d.blue > 255 || d.green > 255){ 
				d.red = Math.floor(Math.random() * 256);
				d.blue = Math.floor(Math.random() * 256);
				d.green = Math.floor(Math.random() * 256);
			}

                        if(d.red < 0 || d.blue < 0 || d.green < 0){ 
				d.red = Math.floor(Math.random() * 256);
				d.blue = Math.floor(Math.random() * 256);
				d.green = Math.floor(Math.random() * 256);
			}

			d.color = 'rgb(' + d.red + ',' + d.green + ',' + d.blue + ')';
			
			return d.color;
		   }
		});

	backgroundTables.transition()
		.duration(2000)
		.attr({
			width: function(d){
				var num = Math.floor((Math.random() * (d.r + 10)) + 1);
				num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

				d.cx = d.cx + num;

				if(d.cx < 0)
				{
				  d.cx *= -1;
				}
		
				return d.cx;

			},
			fill: function(d){
				var num = Math.floor((Math.random() * (d.r + 3)) + 1);
				num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
			
				d.red = d.red + num;
				d.blue = d.blue + num;
				d.green = d.green + num;
                                
                                if(d.red > 255 || d.blue > 255 || d.green > 255){ 
					d.red = Math.floor(Math.random() * 256);
					d.blue = Math.floor(Math.random() * 256);
					d.green = Math.floor(Math.random() * 256);
				}

                                if(d.red < 0 || d.blue < 0 || d.green < 0){ 
					d.red = Math.floor(Math.random() * 256);
					d.blue = Math.floor(Math.random() * 256);
					d.green = Math.floor(Math.random() * 256);
				}


				d.color = 'rgb(' + d.red + ',' + d.green + ',' + d.blue + ')';
			
				return d.color;
			}

		});

	setTimeout(startAnimation, 1000);
}

startAnimation();








