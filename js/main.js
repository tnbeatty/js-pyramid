/*
* main.js
* Nate Beatty
*/

"use strict";

$(document).ready(function() {

	var valsWereChanged = function (mVals, fVals) {
		console.log(mVals);
		console.log(fVals);
	};

	// Generates random populations between 0 and 2000000
	var randomList = function() { // For Testing
		var list = [];
		for (var i = 1; i <= 21; i++) {
			list.push(Math.floor(Math.random() * 1900000) + 1);
		}
		return list;
	};

	P.initPyramid(2000000);
	P.drawPyramid(randomList(), randomList(), valsWereChanged);

});