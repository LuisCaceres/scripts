/* A composite widget may contain navigable descendants or owned children. To move 
through the navigable descendants the user may press HOME, END, or the arrow keys.
This is referred to as directional navigation. The following piece of enables directional
navigation when required. */

(function () {
    'use strict';

    // identifies a composite widget requiring directional navigation 
    document.addEventListener('focus', function directionalNavigationDetector(event) {
        var activeElement = document.activeElement;

        if (allowsDirectionalNavigation(activeElement)) {
            // at this point the currently focused element may have a sibling to navigate to. 
            activeElement.addEventListener('blur', blurHandler);
            activeElement.addEventListener('keydown', keydownHandler);
        }
    }, true);


    // identifies a composite widget requiring directional navigation
    function allowsDirectionalNavigation(element) {    
        return element.hasAttribute('tabindex') ? true : false;
    };


    var blurHandler = function blurHandler(event) {
        this.removeEventListener('blur', blurHandler);
        this.removeEventListener('keydown', keydownHandler);
        event.stopPropagation();
    }


    // navigates forward or backwards to a focusable (if any) 
    var keydownHandler = function keydownHandler(event) {
        var activeElement = document.activeElement;

        var keyCode = event.keyCode,
            // key codes correspond to the left, up, right and down arrow keys
            keyCodes = [37, 38, 39, 40];

        if (keyCodes.includes(keyCode)) {
            let direction = keyCode === 37 || keyCode === 38 ? 'previous' : 'next';
          
            // at this point the currently focused element may have a sibling to navigate to. 
            // The program has to itarate over the siblings to verify this assertion.
            let siblings = new Iterator(activeElement.parentElement.children);
            siblings.autoreset = true;
            siblings.find(activeElement);

            let sibling;
            while (sibling = siblings[direction]()) {

                if (allowsDirectionalNavigation(sibling)) {
                    // at this point the program has found a sibling to navigate to
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