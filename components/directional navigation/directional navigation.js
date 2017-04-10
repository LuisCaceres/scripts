/* A composite widget may contain navigable descendants. To move 
through the navigable descendants the user may press the HOME, END, or arrow keys.
This is referred to as directional navigation. The following piece of code enables 
directional navigation for a composite widget. */

(function () {
    'use strict';

    // attempts to detect a composite widget requiring directional navigation 
    document.addEventListener('focus', function directionalNavigationDetector(event) {
        var activeElement = document.activeElement;

        if (activeElement.getAttribute('role') === 'gridcell') {
            // assumes the element with focus belongs to a composite widget. This element
            // may have siblings to navigate to. The application will respond to
            // certain key presses while the element remains with focus.
            activeElement.addEventListener('blur', blurHandler);
            activeElement.addEventListener('keydown', keydownHandler);
        }
    }, true);


    var blurHandler = function blurHandler() {
        this.removeEventListener('blur', blurHandler);
        this.removeEventListener('keydown', keydownHandler);
    }


    var keydownHandler = function keydownHandler(event) {
        var target = event.target;

        var keyPressed = event.key,
            // key codes map to the END, HOME and arrow keys
            keysAllowed = 'ArrowLeft, ArrowUp, ArrowDown, ArrowRight, End, Home';

        if (keysAllowed.includes(keyPressed)) {
            // the siblings (if any) of the element with focus will be traversed to 
            // find another focusable. 
            let siblings = new Iterator(target.parentElement.children),
                sibling,
                method;  

            if (keyPressed === 'End') {
                // user wishes to navigate to the very last focusable
                // sets a starting point for traversal
                sibling = siblings.last();
                method = 'previous';
            }

            else if (keyPressed == 'Home') {
                // user wishes to navigate to the very first focusable
                // sets a starting point for traversal
                sibling = siblings.first();
                method = 'next';
            }

            else {
                // an arrow key was pressed
                // user wishes to navigate forward or backwards to another focusable
                siblings.find(target);
                siblings.autoreset = true;
                method = keyPressed === 'ArrowLeft' || keyPressed === 'ArrowUp' ? 'previous' : 'next';         
                // sets a starting point for traversal
                sibling = siblings[method]();
            }
         
            // if 'sibling' is not focusable already, it iterates over the other siblings 
            // until a focusable is found
            while (sibling.getAttribute('role') !== 'gridcell') {
                sibling = siblings[method]();
            }

            // at this point a focusable sibling has been found. It will gain focus soon.
            setTimeout(function () {
                // swaps the values of the 'tabindex' attribute. A composite widget can 
                // contain only one element with a 'tabindex' value of 0.
                target.tabIndex = -1;
                sibling.tabIndex = 0;
                sibling.focus();
            }, 0);

            event.preventDefault();
        }
    };
})();
