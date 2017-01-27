var dialog = (function () {
    "use strict";

    // loses focus when the dialog opens and regains focus once the dialog closes
    var previouslyFocusedElement = null;

    var body = document.body;

    // creates a dialog. At most, there is one dialog per document.
    var dialog = document.createElement('div');
    dialog.id = 'dialog';
    dialog.setAttribute('aria-describedby', 'dialog-description');
    dialog.setAttribute('aria-labelledby', 'dialog-name');


    Object.defineProperties(dialog, {
        // toggles the visibility of the dialog
        open: {
            set: (function () {
                var children = [];

                return function (value) {

                    if (value === true) {
                        // opens the dialog 

                        // at this point no elements should be perceivable other than the dialog and its 
                        // contents. If still perceivable, all of the children of <body> (except the dialog) 
                        // become unperceivable through the 'aria-hidden' attribute. 
                        Array.from(body.children).forEach(function (child) {

                            if (!child.getAttribute('aria-hidden')) {
                                child.setAttribute('aria-hidden', true);
                                // remembers which children should become perceivable after the dialog closes. This 
                                // is in order to preserve the application state prior to the dialog opening.
                                children.push(child);
                            }
                        });

                        // appends the dialog 
                        body.append(backdrop);

                        // disables scrolling of <body> while the dialog is open
                        body.style.overflowY = 'hidden';

                        // sets focus to the first focusable element in the dialog (in tree order)
                        setTimeout(function () {
                            previouslyFocusedElement = document.activeElement;
                            dialog.querySelector('a, button, input, select, textarea').focus();
                        }, 0);
                    }

                    // closes the dialog
                    else if (value === false) {
                        // refer to comment on line 48
                        children.forEach(function (child) {child.removeAttribute('aria-hidden');});
                        backdrop.remove();
                        rejectionButton.remove();

                        // enables scrolling of <body>
                        body.style.overflowY = '';

                        // the element that lost focus (because the dialog opened) is set focus again
                        setTimeout(function () {
                            previouslyFocusedElement.focus();
                        }, 0);
                    }
                }
            })()
        }
    });


    // creates a placeholder for the accessible name and description as required by ARIA
    var description = document.createElement('div');
    description.id = 'dialog-description';

    var name = document.createElement('div');
    name.id = 'dialog-name';

    dialog.append(name, description);


    // creates the backdrop
    var backdrop = document.createElement('div');
    backdrop.id = 'backdrop';
    backdrop.append(dialog);


    // creates the fulfillment button
    var fullfilmentButton = document.createElement('button');
    fullfilmentButton.className = "button";
    fullfilmentButton.textContent = 'Ok';

    // creates the rejection button
    var rejectionButton = document.createElement('button');
    rejectionButton.className = "button";
    rejectionButton.textContent = 'Cancel';

    // dialog closes when clicked 
    fullfilmentButton.addEventListener('click', clickHandler);
    rejectionButton.addEventListener('click', clickHandler);

    function clickHandler(event) {
        dialog.open = false;
        event.stopPropagation();
    }


    return {

        // mimics 'window.alert()'
        alert: function (/*name, description*/) {
            dialog.setAttribute('role', 'alertdialog');
            name.textContent = arguments[0];
            description.textContent = arguments[1];
            dialog.append(fullfilmentButton);
            dialog.open = true;
        },

        // mimics 'window.confirm()'
        confirm: function (/*name, description*/) {
            var self = this;

            dialog.setAttribute('role', 'dialog');
            name.textContent = arguments[0];
            description.textContent = arguments[1];
            dialog.append(fullfilmentButton, rejectionButton);
            dialog.open = true;

            fullfilmentButton.addEventListener('click', function clickHandler(event) {
                self.onfulfilled();
                fullfilmentButton.removeEventListener('click', clickHandler);
            });

            rejectionButton.addEventListener('click', function clickHandler(event) {
                self.onrejected();
                rejectionButton.removeEventListener('click', clickHandler);
            });
        },

        // called when 'fullfilmentButton' is pressed
        onfulfilled: function(){},

        // called when 'rejectionButton' is pressed
        onrejected: function(){}
    };

    return dialog;
})();