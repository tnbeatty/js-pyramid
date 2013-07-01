/*
* main.js
* Nate Beatty
*/

"use strict";

window.onload = function() {

	/*************************/
	/*  Resizable Rectangle  */
	/*************************/

	var paper = Raphael("paper", 300, 300),
	rect = paper.rect(50, 50, 100, 100).attr({
		fill: "hsb(1, 1, 1)",
		}),
	rstart = function () {
		// storing original coordinates
		this.ox = this.attr("x");
		this.oy = this.attr("y");
		
		this.ow = this.attr("width");
		this.oh = this.attr("height");
	},
	rmove = function (dx, dy) {
		// move will be called with dx and dy
		// this.attr({x: this.ox, y: this.oy});
		this.attr({width: this.ow + dx, height: this.oh + dy});
	};

	rect.drag(rmove, rstart);

	/******************/
	/*  Raphael Plot  */
	/******************/

	var canvas = Raphael("canvas", 300, 300),
	chart = canvas.barchart(0, 0, 260, 260, [76, 70, 67, 71, 69], {}),
	rstart2 = function () {
		// storing original coordinates
		this.ox = this.attr("x");
		this.oy = this.attr("y");
		
		this.ow = this.attr("width");
		this.oh = this.attr("height");
	},
	rmove2 = function (dx, dy) {
		// move will be called with dx and dy
		// this.attr({x: this.ox, y: this.oy});
		this.attr({width: this.ow + dx, height: this.oh + dy});
		this['bar'].attr({h: 200});
		this['h'] = 200;
	},
	clk = function () {
		// console.log('Bar Clicked.');
		// console.log(this);
	};

	chart.each(function () {
		// console.log(this);
		this.drag(rmove2, rstart2);
		this.click(clk);
	});
};