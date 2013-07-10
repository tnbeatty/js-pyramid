/*
 * main.js
 * Nate Beatty
 */

"use strict";

// This will be called when input button
// `Generate Random Values` is clicked.
var redrawButtonClick = function() {
	P.drawPyramid(randomList(), randomList());
}

var valsWereChanged = function(mVals, fVals) {
	console.log('Pyramid values were modified.')
	console.log(mVals);
	console.log(fVals);
};

// Generates random values between 0 and 2000000
// For testing and demonstration purposes only
var randomList = function() {
	var list = [];
	for (var i = 1; i <= 21; i++) {
		list.push(Math.floor(Math.random() * 1900000) + 1);
	}
	return list;
};

$(document).ready(function() {
	var maxPop = 2000000;
	var list1 = randomList();
	var list2 = randomList();

	P.initPyramid(valsWereChanged, maxPop);
	P.drawPyramid(list1, list2);
});