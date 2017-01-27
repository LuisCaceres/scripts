/* Composite widgets may implement directional navigation through certain keys 
(arrow keys, end, home). A list of items is an example. The following piece of 
code identifies such widgets and enables directional navigation. */

(function () {
    'use strict';

    // identifies a composite widget requiring directional navigation 
    document.addEventListener('focus', function directionalNavigationDetector(event) {
        var activeElement = document.activeElement;

        if (allowsDirectionalNavigation(activeElement)) {
            // at this point the currently focused element may have a sibling to navigate to. 
            // The program has to itarate over the siblings to verify this assertion.
            siblings = new Iterator(activeElement.parentElement.children);
            siblings.autoreset = true;
            siblings.find(activeElement);

            let sibling;
            while (sibling = siblings.next()) {

                if (allowsDirectionalNavigation(sibling)) {
                    // at this point it is clear there is a sibling to navigate to.
                    activeElement.addEventListener('blur', blurHandler);
                    activeElement.addEventListener('keydown', keydownHandler);
                    break;
                }
            }
        }
    }, true);

    // identifies a composite widget requiring directional navigation
    function allowsDirectionalNavigation(element) {    
        return element.hasAttribute('tabindex') ? true : false;
    };


    var siblings = null;


    var blurHandler = function blurHandler(event) {
        this.removeEventListener('blur', blurHandler);
        this.removeEventListener('keydown', keydownHandler);
        event.stopPropagation();
    }


    // navigates forward or backwards to a focusable (if any) 
    var keydownHandler = function keydownHandler(event) {
        var keyCode = event.keyCode,
            // key codes correspond to the left, up, right and down arrow keys
            keyCodes = [37, 38, 39, 40];

        if (keyCodes.includes(keyCode)) {
            let direction = keyCode === 37 || keyCode === 38 ? 'previous' : 'next';

            // starts iterating from the currently focused element
            siblings.find(event.target);

            let sibling;
            while (sibling = siblings[direction]()) {

                if (allowsDirectionalNavigation(sibling)) {
                    // at this point the program has found a sibling to navigate to
                    sibling.addEventListener('blur', blurHandler);
                    sibling.addEventListener('keydown', keydownHandler);
                    setTimeout(function(){
                        sibling.focus();
                    }, 0);
                    break;
                }
            }

            event.preventDefault();
            event.stopPropagation();
        }
    };
})();