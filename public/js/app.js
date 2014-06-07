


var hello = (function(){
	document.write('<h1>Hello World</h1>');
})();


var svg = d3.select("body").append("svg")
			.attr("width", 200)
			.attr("width", 700);


svg.append("circle")
	.attr("r",40)
	.attr("cx",40)
	.attr("cy",40);
