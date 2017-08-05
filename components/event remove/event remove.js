/* Sometimes it is desired that an event is triggered in response to the removal
of an element from the DOM tree. For example, a shopping application could
intercept the deletion of an item from the basket and make sure the user wishes
to proceeed with the removal. Likewise, an application could set focus to
another element once the currently focused element is removed. The following
piece of code implements a new type of event called 'remove'. */

(function () {
    "use strict";

    // Let 'removeEvent' be a remove event.
    var removeEvent = new Event('remove');

    (function () {

        /** Attempt to detect a button able to delete its associated element.
         * @param {PointerEvent} event
         */
        function onPointerDown(event) {
            // Let 'target' be the target of the event.
            const target = event.target;

            // If 'target' is a button able to remove its associated element.
            if (target.classList.contains('js-remove-button')) {
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
        }

        // Listen for pointerdown events firing anywhere in the application.
        window.addEventListener('pointerdown', onPointerDown, true);
    }());


    (function () {

        /** Attempt to detect an element that may be removed.
         * @param {FocusEvent} event
         * @listens FocusEvent.type === 'focusin'
         */
        function onFocusIn(event) {
            // Let 'target' be the target of the event.
            const target = event.target;
            // Let 'ID' be the value of 'target's id attribute (if any).
            const ID = target.id;

            // If 'ID' is a value.
            if (ID) {
                // Let 'SELECTOR' be a CSS selector matching a button able to remove 'target'.
                const SELECTOR = '[aria-controls*=' + ID + ']';
                // Let 'match' be the element that 'SELECTOR' matches (if any).
                const match = document.querySelector(SELECTOR);

                // If 'match' is an element.
                if (match) {
                    // Let 'element' be 'target'.
                    const element = target;
                    // Listen for 'focusout' events originating at 'element'.
                    element.addEventListener('focusout', onFocusOut, true);
                    // Listen for 'keydown' events originating at 'element'.
                    element.addEventListener('keydown', onKeyDown, true);
                }
            }
        }


        /** Remove event handlers associated with an element that may be
         * removed.
         * @param {FocusEvent} event 
         */
        function onFocusOut(event) {
            /** @type {HTMLElement} */
            // Let 'element' be an HTML element that may be removed.
            const element = event.target;
            // Stop listening for 'focusout' events fired at 'element'.
            element.removeEventListener('focusout', onFocusOut, true);
            // Stop listening for 'keydown' events fired at 'element'.
            element.removeEventListener('keydown', onKeyDown, true);
        };


        /** Remove an element when the 'DELETE' key is pressed.
         * @param {KeyboardEvent} event
         * @listens KeyboardEvent.type === 'keydown'
         */
        function onKeyDown(event) {
            // Let 'KEY' be the key pressed.
            const KEY = event.key;
            // If the 'DELETE' key was pressed.
            if (KEY === 'Delete' || KEY === 'Del') {
                /** @type {HTMLElement} */
                // Let 'element' be the element to remove.
                const element = event.target;
                // Fire a remove event.
                element.dispatchEvent(removeEvent);
                // Remove 'element'.
                element.remove();
            }
        };

        // Listen for focusin events originating anywhere in the application.
        window.addEventListener('focusin', onFocusIn, true);
    }());
}());