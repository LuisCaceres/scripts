/* Some widgets benefit from directional navigation keys (arrow keys, end, home). 
The following piece of code identifies such widgets and enables directional navigation. */


(function () {
    'use strict';

    // uses this string as a group of selectors to match against
    var defaultFocusableElements = 'a, button, input, select, textarea';

    // checks if 'element' and its siblings fit a pattern that lends itself for directional 
    // navigation.
    function allowsDirectionalNavigation(element) {
        
        if (element.matches(defaultFocusableElements) === false &&
            element.hasAttribute('tabindex')) {
            return true;
        }
        else {
            return false;
        }
    };

    var siblings = null;



    // disables directional navigation 
    var blurHandler = function blurHandler(event) {
        this.removeEventListener('blur', blurHandler);
        this.removeEventListener('keydown', keydownHandler);
    }



    // navigates forward or backwards to the next focusable sibling (if any) in terms 
    // of directional navigation 
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




    // enables directional navigation in a widget as long as the siblings of the currently
    // focused element (and itself) fit a certain pattern. 
    document.addEventListener('focus', function directionalNavigationDetector(event) {
        var activeElement = document.activeElement;

        if (allowsDirectionalNavigation(activeElement)) {
            // at this point it seems the currently focused element may have siblings to navigate 
            // to. Now, the program has to itarate over the siblings to verify if this the case.
            siblings = new Iterator(activeElement.parentElement.children);
            siblings.autoreset = true;
            siblings.find(activeElement);

            let sibling;
            while (sibling = siblings.next()) {

                if (allowsDirectionalNavigation(sibling)) {
                    // at this point it is clear there is at least another sibling to navigate to.
                    activeElement.addEventListener('blur', blurHandler);
                    activeElement.addEventListener('keydown', keydownHandler);
                    siblings.find(activeElement);
                    break;
                }
            }
        }
    }, true);
})();


