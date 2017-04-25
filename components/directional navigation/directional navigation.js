/* A composite widget may contain navigable descendants. To move 
through the navigable descendants the user may press the HOME, END, or arrow keys.
This is referred to as directional navigation. The following piece of code enables 
directional navigation for a composite widget. */

(function () {
    'use strict';

    // Attempts to detect a composite widget requiring directional navigation.
    document.addEventListener('focus', function directionalNavigationDetector() {
        var activeElement = document.activeElement;

        if (activeElement.getAttribute('role') === 'gridcell') {
            // Assumes the element with focus belongs to a composite widget. This element
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
            keysAllowed = 'ArrowLeft, ArrowUp, ArrowDown, ArrowRight, End, Home';

        if (keysAllowed.includes(keyPressed)) {
            // The siblings (if any) of the element with focus
            // will be visited to find another focusable. 
            let siblings = new Iterator(target.parentElement.children),
                sibling,
                method;  

            if (keyPressed === 'End') {
                // User wants to navigate to the very last focusable.
                // Sets a starting point for iteration.
                sibling = siblings.last();
                method = 'previous';
            }

            else if (keyPressed == 'Home') {
                // User wants to navigate to the very first focusable.
                // Sets a starting point for iteration.
                sibling = siblings.first();
                method = 'next';
            }

            else {
                // An arrow key was pressed.
                // User wants to navigate forward or backwards to another focusable.
                siblings.positionAt(target);
                siblings.autoreset = true;
                method = keyPressed === 'ArrowLeft' || keyPressed === 'ArrowUp' ? 'previous' : 'next';         
                // Sets a starting point for iteration.
                sibling = siblings[method]();
            }
         
            // If 'sibling' is not focusable, iteration moves to another sibling until
            // a focusable sibling is found.
            while (sibling.getAttribute('role') !== 'gridcell') {
                sibling = siblings[method]();
            }

            // At this point a focusable sibling has been found. It will gain focus soon.
            setTimeout(function () {
                // Swaps the values of the 'tabindex' attribute. A composite widget can 
                // contain only one element with a 'tabindex' value of 0.
                target.tabIndex = -1;
                sibling.tabIndex = 0;
                sibling.focus();
            }, 0);

            event.preventDefault();
        }
    };
})();