/* Sometimes it is desired that an event is triggered in response to the removal
of an element from the DOM tree. For example, a shopping application could intercept
the deletion of an item from the basket and make sure the user wishes to proceeed. 
Likewise, an application could set focus to another element once the currently 
focused element is removed. The following piece of code implements a new type of 
event called 'remove'. */

(function () {
    "use strict";

    // Let 'event' be a remove event.
    var removeEvent = new Event('remove');

    (function () {

        /** Attempt to detect a button able to delete its associated element.
         * @param {PointerEvent} event
         */
        function onPointerDown(event) {
            // Let 'target' be the target of the event.
            // If 'target' is a button able to remove its associated element.
            if (target.classList.contains('js-delete-button')) {
                // Let 'button' be 'target'.
                const button = target;
                // Let 'SELECTOR' be a CSS selector matching 'button's associated element.
                const SELECTOR = '#' + button.getAttribute('aria-controls');
                // Let 'element' be 'button's associated element.
                const element = document.querySelector(SELECTOR);
                // Fire a remove event.
                element.dispatchEvent(removeEvent);
                // Remove 'element'.
                element.remove();
            }
        });
    })();

        // Listen for pointerdown events firing anywhere in the application.
        window.addEventListener('pointerdown', onPointerDown, true);


    (function () {

        /** Attempt to detect an element that may be removed.
         * @param {FocusEvent} event
         * @listens FocusEvent.type === 'focusin'
         */
        function onFocusIn(event) {
            // Let 'target' be the target of the event.
            var activeElement = document.activeElement,
                id;

            // If 'target' has a value for its id attribute.
            if (id = activeElement.id) {
                // Look for a button that is able to remove 'target'.
                let deleteButton = document.querySelector('[aria-controls*=' + id + ']');

                // If there is a button able to remove 'target'.
                // Let 'button' be the button able to remove 'target'.
                if (deleteButton) {
                    // Let 'element' be 'target'.
                    let removee = activeElement;
                    // Associate 'element' with 'target'.
                    removee.deleteButton = deleteButton;
                    // Listen for 'focusout' events originating at 'element'.
                    element.addEventListener('focusout', onFocusOut, true);
                    // Listen for 'keydown' events originating at 'element'.
                    removee.addEventListener('keydown', keydownHandler);
                }
            }
        }, true);


        /** Remove event handlers associated with an element that may be
         * removed.
         * @param {FocusEvent} event 
         */
        function onFocusOut(event) {
            /** @type {HTMLElement} */
            // Let 'element' be an HTML element that may be removed.
            var removee = this;
            // Stop listening for 'focusout' events fired at 'element'.
            element.removeEventListener('focusout', onFocusOut, true);
            // Stop listening for 'keydown' events fired at 'element'.
            removee.removeEventListener('keydown', keydownHandler);
            event.stopPropagation();
        };


        /** Remove an element when the 'DELETE' key is pressed.
         * @param {KeyboardEvent} event
         * @listens KeyboardEvent.type === 'keydown'
         */
        var keydownHandler = function keydownHandler(event) {
            /** @type {HTMLElement} */
            // Let 'element' be the element to be removed.
            var removee = this;

            // If the 'DELETE' key was pressed.
            if (event.keyCode === 46) {
                // Fire a remove event.
                removee.dispatchEvent(removeEvent);
                // Remove 'element'.
                removee.remove();
                // Remove the delete button associated with 'element'.
                removee.deleteButton.remove();
            }
        };
    })();

        // Listen for focusin events originating anywhere in the application.
        window.addEventListener('focusin', onFocusIn, true);
