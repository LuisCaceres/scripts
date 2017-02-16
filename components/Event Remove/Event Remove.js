/* Sometimes it is desired that an event is triggered in response to the removal
of an element from the DOM tree. For example, a shopping application could intercept
the deletion of an item from the basket and make sure the user wishes to proceeed. 
Likewise, an application could set focus to another element once the currently 
focused element is removed. The following piece of code implements a new type of 
event called 'remove'. */

(function () {
    "use strict";

    // creates a 'remove' event for the application to listen for
    var deleteEvent = document.createEvent('Event');
    deleteEvent.initEvent('remove', true, true);

    // addresses an issue with 'defaultPrevented' on Internet Explorer. 'defaultPrevented' 
    // always returns false even if 'preventDefault()' is called. 
    deleteEvent.preventDefault = function () {
        if (!this.hasOwnProperty('defaultPrevented')) {
            Object.defineProperty(this, 'defaultPrevented', {
                configurable: true,
                get: function () { return true; },
            });
        }
    };

    // an element that allows removal MUST be associated with a delete button. The following
    // IIFE implements the behaviour of a delete button.
    (function () {

        // once an element gains focus the program verifies if the element is a delete button
        document.addEventListener('click', function deleteButtonDetector(event) {

            if (event.target.matches('.js-delete-button')) {    
                let deleteButton = event.target,
                    removee;

            // when the delete button is pressed the program traverses the DOM 
            // tree in search of the elements the delete button controls
            var removees = IDReferenceList(deleteButton.getAttribute('aria-controls'));
            removees = new Iterator(removees);

            // once found, the program removes the elements unless 'preventDefault()' was called
            while (removee = removees.next()) {
                removee.dispatchEvent(deleteEvent);

                if (!deleteEvent.defaultPrevented) {
                    removee.remove();
                }
            }

            // please refer to comment on line 15
            delete deleteEvent.defaultPrevented;
            event.stopPropagation();              
            }
        });
    })();




    // This IIFE implements the behaviour for an element that allows removal (removee). 
    (function () {

        // once an element gains focus the program verifies if the currently focused element
        // is associated with a delete button
        document.addEventListener('focus', function removeeDetector(event) {
            var activeElement = document.activeElement,
                id;

            if (id = activeElement.id) {
                // searches for a delete button (if any)
                let deleteButton = document.querySelector('[aria-controls*=' + id + ']');

                if (deleteButton) {
                    // at this point it is clear the currently focused element allows removal
                    let removee = activeElement;      
                    removee.deleteButton = deleteButton;
                    removee.addEventListener('blur', blurHandler);
                    removee.addEventListener('keydown', keydownHandler);
                }
            }
        }, true);


        var blurHandler = function blurHandler(event) {
            var removee = this;
            removee.removeEventListener('blur', blurHandler);
            removee.removeEventListener('keydown', keydownHandler);
            event.stopPropagation();
        };


        // an element may be removed when pressing the 'delete' key
        var keydownHandler = function keydownHandler(event) {
            var removee = this;

            // key code represents the delete key
            if (event.keyCode === 46) {

                // notifies the application about the removal operation
                removee.dispatchEvent(deleteEvent);
            
                // at this point it is clear the currently focused element will be removed
                // unless 'preventDefault()' was called.
                if (deleteEvent.defaultPrevented === false) {
                    removee.remove();
                    removee.deleteButton.remove();
                }

                // please refer to comment on line 15
                delete deleteEvent.defaultPrevented;

                event.stopPropagation();
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