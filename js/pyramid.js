/*
 * pyramid.js
 * Nate Beatty
 *
 * The Javascript to build a population pyramid
 * for the Intlpop population simulation project.
 *
 * Uses the Tipsy JS library for hover-over titles.
 * Documentation for Tipsy can be found at
 * http://onehackoranother.com/projects/jquery/tipsy
 */

"use strict";

var pyramid = { // Keep track of some stats about the pyramid
	maxpop: 0,
	maxpx: 175,
	leftVals: [],
	rightVals: []
};

/* 
 * Initializes the pyramid by appending the appropriate
 * html to the inside of the div of class 'pyramid'. Also gets the
 * pyramid ready to be redrawn with values corresponding to populations.
 *
 * @param maxpop (int) Specifies the maximum value that can be
 * displayed in the pyramid. This should be the population value that
 * a bar stretching all of the way across its allotted width would
 * represent. The value of this parameter is used to calculate bar widths
 * each time the pyramid is redrawn.
 */
var initPyramid = function(maxpop) {
	console.log('Building the pyramid. Max value: ' + maxpop);

	$('.pyramid div').html(''); // start fresh - clear any html in the pyramid

	// Build the left bars
	var lbars = [];
	for (var i = 0; i < 20; i++) {
		var barID = 'lbar' + i;
		lbars[i] = '<div class="bar"><div class="lbar" id="' + barID + '"></div></div>';
	};
	var lbarDivs = lbars.join('');

	// Build the right bars
	var rbars = [];
	for (var i = 0; i < 20; i++) {
		var barID = 'rbar' + i;
		rbars[i] = '<div class="bar"><div class="rbar" id="' + barID + '"></div></div>';
	};
	var rbarDivs = rbars.join('');

	$('.pyramid').append('<div id="container"></div>');
	$('#container').append('<div id="lcontainer">' + lbarDivs + '</div>');
	$('#container').append('<div id="rcontainer">' + rbarDivs + '</div>');
	$('.lbar').resizable({
		handles: 'w',
		maxWidth: pyramid.maxpx,
		minWidth: 0
	});
	$('.rbar').resizable({
		handles: 'e',
		maxWidth: pyramid.maxpx,
		minWidth: 0
	});

	pyramid['maxpop'] = maxpop;
	pyramid['maxpx'] = $('.bar').first().width();

	// Set listeners to respond to events within the pyramid
	$('.lbar,.rbar').resize(function(){
		barWasDragged($(this));
	});

	// Set popups on hover for the bars using Tipsy
	$('.lbar,rbar').tipsy({title: 'id', fade: true, gravity: 'se'});
};

/* Resizes the initialized pyramid with values given in the parameters.
 *
 * @param leftVals (array of 20 int values) An array of values, one for
 * each bar on the left side of the pyramid. These should be population values.
 *
 * @param rightVals (array of 20 int values) An array of values, one for
 * each bar on the right side of the pyramid. These should be population values.
 */
var drawPyramid = function(leftVals, rightVals) {
	if (typeof leftVals != 'undefined' && typeof rightVals != 'undefined') {
		pyramid['leftVals'] = leftVals;
		pyramid['rightVals'] = rightVals;
	}

	if (pyramid.leftVals.length != 20 || pyramid.rightVals.length != 20) {
		console.log('In pyramid.js: drawPyramid() parameter values must be arrays of length 20.')
		return;
	}

	$('.lbar').each(function(index) {
		var newBarWidth = popToPixels(pyramid.leftVals[index]);
		if (newBarWidth > pyramid.maxpx) {
			console.log('Left bar ' + index + ' value overflow.');
		}
		$(this).width(newBarWidth);
		var leftoffset = pyramid.maxpx - newBarWidth;
		$(this).css('left', leftoffset); // To right align the left bars
	});
	$('.rbar').each(function(index) {
		var newBarWidth = popToPixels(pyramid.rightVals[index]);
		if (newBarWidth > pyramid.maxpx) {
			console.log('Right bar ' + index + ' value overflow.');
		}
		$(this).width(newBarWidth);
	});
};

var barWasDragged = function(e) {
	var elementID = e.attr('id');
	var isLeftBar = (elementID[0] == 'l') ? true : false;
	var barIndex = parseInt(elementID.substring(4, elementID.length));

	// For testing
	var side = (isLeftBar) ? 'left' : 'right';
	console.log('Width of '+side+' bar '+barIndex+' changed to: '+e.width()+'px='+pixelsToPop(e.width())+'ppl.');
};

/**********************
**  Utility Methods  **
**********************/

function pixelsToPop(px) {
	return Math.round((px / pyramid.maxpx) * pyramid.maxpop);
};

function popToPixels(pop) {
	return Math.round((pop / pyramid.maxpop) * pyramid.maxpx);
};

/***************************
**  Execute on DOM Ready  **
***************************/

$(document).ready(function() {

	initPyramid(2000000);

	var randomList = function() { // For testing
		var list = [];
		for (var i = 1; i <= 20; i++) {
			list.push(Math.floor(Math.random() * 1900000) + 1);
		}
		return list;
	};

	drawPyramid(randomList(), randomList());

});