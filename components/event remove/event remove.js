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

        // Listen for click events originating anywhere in the application.
        document.addEventListener('click', function deleteButtonDetector(event) {
            // Let 'target' be the target of the event.
            // If 'target' is a button able to remove its associated element.
            if (event.target.matches('.delete-button')) {
                // Let 'button' be 'target'.
                let deleteButton = event.target,
                    removee;

                // Let 'id' be the id of 'button's associated element. 
                // Let 'element' be 'button's associated element.
                var removees = IDReferenceList(deleteButton.getAttribute('aria-controls'));
                removees = new Iterator(removees);

                while (removee = removees.next()) {
                    // Fire a remove event.
                    removee.dispatchEvent(removeEvent);
                    // Remove 'element'.
                    removee.remove();
                }
            }
        });
    })();


    (function () {

        // Listen for focus events originating anywhere in the application.
        document.addEventListener('focus', function removeeDetector(event) {
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
                    removee.addEventListener('blur', blurHandler);
                    // Listen for 'keydown' events originating at 'element'.
                    removee.addEventListener('keydown', keydownHandler);
                }
            }
        }, true);


        /** Remove event handlers associated with an element that may be
         * removed.
         * @param {Event} event 
         */
        var blurHandler = function blurHandler(event) {
            /** @type {HTMLElement} */
            // Let 'element' be an HTML element that may be removed.
            var removee = this;
            // Stop listening for 'focusout' events fired at 'element'.
            removee.removeEventListener('blur', blurHandler);
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


    // given a string of id values it returns an array containing elements that
    // matching those values.   
    function IDReferenceList(string) {
        // let's just have one space in between references
        return string.replace(/\s+/g, " ")
            // let's prepend the hash sign to each reference
            .replace(/(^|\s)(?=[A-z])/g, " #")
            // let's get rid of extra white space 
            .trim()
            // let's create an array of references
            .split(/\s/)
            // let's map those refences to actual elements
            .map(document.querySelector, document);
    }
})();