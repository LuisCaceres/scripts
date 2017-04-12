/* The aim of this file is to fill in the gaps screen readers have not filled. This is done through the implementation of the following pieces of code. From time to time it is recommended that screen readers be tested. This is in order to check if any of these individual pieces of code are still necessary. */


/* The 'maxlength' attribute of <input> and <textarea> elements has no effect when the user is prevented from entering any more characters. In other words, a screen reader will not make the user aware of this situation. For example, if the user presses the 'm' key,
the screen reader will say 'em. However, no letter 'm' is inserted. This is frustrating for the user experience. I have not found an obvious way to make a screen reader announce this situation to the user.

Tested on JAWS 17 on Internet Explorer 11 
*/

(function(){
	'use strict';
  
  window.addEventListener('keypress', function (event) {
  	var target = event.target,
    	  relevance = 'INPUT, TEXTAREA';
    
    if (relevance.includes(target.nodeName) && target.maxLength > -1) {
        if (target.value.length === target.maxLength) {
        	console.log('The character "' + event.key + '" could not be inserted.');
        }
    }
  }, true);
}());
