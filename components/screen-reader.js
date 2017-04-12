/* The aim of this file is to fill in the gaps screen readers have not filled. This is done through the implementation of the following pieces of code. From time to time it is recommended that screen readers be tested. This is in order to check if any of these individual pieces of code are still necessary. */


/* The 'maxlength' attribute of <input> and <textarea> elements has no effect when the user is prevented from entering any more characters. In other words, a screen reader will not make the user aware of this situation. For example, if the user presses the 'm' key,
the screen reader will say 'em. However, no letter 'm' is inserted. This is frustrating for the user experience. I have not found an obvious way to make a screen reader announce this situation to the user.

Tested on JAWS 17 on Internet Explorer 11 
*/

(function () {
	'use strict';

	function onKeyPress(event) {
		var target = event.target,
			relevance = 'INPUT, TEXTAREA';

		if (relevance.includes(target.nodeName) &&
			target.maxLength > -1 &&
			target.maxLength === target.value.length) {
			console.log('The character "' + event.key +
				'" could not be  inserted.');
		}
	}

	window.addEventListener('keypress', onKeyPress, true);
}());




/* The 'pattern' attribute of an <input> element has no effect when the user is prevented from entering any characters. 
In other words, a screen reader will not make the user aware of this situation. 
For example, if an <input> expects only letters and the user presses the '9' key, the screen reader will say 'nine'. 
However, no number '9' is inserted. This is frustrating for the user experience.
This is especially true when no error message is displayed to the sighted user (presumably because it is very obvious).
I have not found an obvious way to make a screen reader announce this situation to the user.
There is no current ARIA specification that deals with this.
*/