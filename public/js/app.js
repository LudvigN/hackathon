


var hello = (function(){
	document.write('<h1>Hello World</h1>');
})();



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
	   var x = Math.floor((Math.random() * width) + 1);
	   var y = Math.floor((Math.random() * height) + 1);	   
	   var size = Math.floor((Math.random() * 20) + 1);	
	   var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';   

	   var c = { r: size, cx: x, cy: y, color: color};
	   data.push(c);
	}

}


var draw = function(){
	svg.selectAll("circle").data(data)
		.enter()
		.append("circle")
		.attr({
		   r: function(d){ return d.r;},
		   cx: function(d){ return d.cx;},
		   cy: function(d){ return d.cy;},
		   fill: function(d) { return d.color;}
		});
}

var reset = function(){

	data = [];
	
	svg.selectAll("circle").data(data)
		.exit()
		.remove();
	
	console.log("drawing");
	generateData();

	draw();
	
	setTimeout(reset, 1000);
}

reset();







