Pyramid
===

Clone, fire up your favorite webserver, and check out the demo.

Usage
---

Include the `css/pyramid.css` and `js/pyramid.js` source code in your project.

In your HTML, include a div with the class `pyramid`. It should look something like this:

	<div class="pyramid"></div>

When the DOM has loaded, you will need to execute some javascript to initialize and build the pyramid. See `js/main.js` for an example.

First, you need to initialize the pyramid. This is done with the initPyramid function. This function takes one parameter, the maximum value of the plot range. In the case of the IntlPop project, you will need to specify the maximum population allowed on the plot. Execute something like the following code:

	P.initPyramid(2000000);

Next, you need to add some initial values. Call the `drawPyramid()` method with three parameters:

	* `leftValues` : An array of 20 integers between 0 and the maximum value that you specified when you initialized the pyramid. These values will be represented on the left side of the pyramid.
	* `rightValues` : An array of 20 integers between 0 and the maximum value that you specified when you initialized the pyramid. These values will be represented on the right side of the pyramid.
	* `eventListener` : The callback function that will be triggered anytime the left or right values change. For example: if the user drags one of the bars of the chart, resizing it, the new size is converted to a value proportional to the relative bar size and then saved in place of the old value. Then, `eventListener` is called with the parameters `leftValues` and `rightValues`. These parameters are arrays of 20 integers. See main.js for a working example.

Example
---

Lets say we have an HTML document with the following div:

	<div class="pyramid"></div>

Then our javascript would need to include something like the following:

	// Will be called whenever any of the left or right pyramid values
	// were changed by the user dragging and resizing one of the bars.
	var valsWereChanged = function (mVals, fVals) {
		console.log(mVals);
		console.log(fVals);
	};

	var leftValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	var rightValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

	P.initPyramid(2000000);
	P.drawPyramid(leftValues, rightValues, valsWereChanged);
