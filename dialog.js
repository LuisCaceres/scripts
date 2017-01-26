var dialog = (function () {
    "use strict";

    // 'previouslyFocusedElement' loses focus when the dialog window opens and it will 
    // regain focus once the dialog window closes
    var previouslyFocusedElement = null;

    var body = document.body;

    // creates the dialog. At most, there is one instance per document.
    var dialog = document.createElement('div');
    dialog.id = 'dialog';
    dialog.setAttribute('aria-describedby', 'dialog-description');
    dialog.setAttribute('aria-labelledby', 'dialog-name');


    Object.defineProperties(dialog, {
        // sets the accessible description as required by ARIA
        description: {
            set: function (value) {
                description.textContent = value;
            }
        },

        // sets the accessible name as required by ARIA
        name: {
            set: function (value) {
                name.textContent = value
            }
        },

        // toggles the visibility of the dialog
        open: {
            set: (function () {
                var children = [];

                return function (value) {
                    // opens dialog window
                    if (value === true) {

                        // at this point the dialog and its contents must be the only perceivable elements in the document.
                        // Iterates over the children of '<body>' and sets 'aria-hidden'
                        // to 'true' as long as this attribute is not present
                        Array.from(body.children).forEach(function (child) {
                            if (!child.getAttribute('aria-hidden')) {
                                child.setAttribute('aria-hidden', true);
                                // saves a reference to the children whose perceivability has been turned off. Once
                                // the dialog closes these children will be perceivable again.
                                children.push(child);
                            }
                        });

                        // appends the dialog 
                        body.append(backdrop);

                        // disables scrolling of <body> while the dialog window is open
                        body.style.overflowY = 'hidden';

                        // sets focus to the first focusable element in tree order
                        setTimeout(function () {
                            previouslyFocusedElement = document.activeElement;
                            dialog.querySelector('a, button, input, textarea').focus();
                        }, 0);
                    }

                    // closes dialog
                    else if (value === false) {
                        // please refer to comment on line 41
                        children.forEach(function (child) {child.removeAttribute('aria-hidden');});
                        backdrop.remove();
                        noButton.remove();

                        // reenables scrolling of <body>
                        body.style.overflowY = '';

                        // sets focus to the last focused element before the dialog window opened
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


    // creates the yes button
    var yesButton = document.createElement('button');
    yesButton.className = "button primary";
    yesButton.textContent = 'Ok';
    // closes the dialog when clicked
    yesButton.addEventListener('click', clickHandler);

    // creates the no button
    var noButton = document.createElement('button');
    noButton.className = "button secondary";
    noButton.textContent = 'Cancel';
    // closes the dialog when clicked
    noButton.addEventListener('click', clickHandler);

    function clickHandler(event) {
        dialog.open = false;
        event.stopPropagation();
    }


    return {

        // resembles 'window.alert()'
        alert: function (/*name, description*/) {
            dialog.setAttribute('role', 'alertdialog');
            dialog.name = arguments[0];
            dialog.description = arguments[1];
            dialog.append(yesButton);
            dialog.open = true;
        },

        // resembles 'window.confirm()'
        confirm: function (/*name, description*/) {
            var self = this;

            dialog.setAttribute('role', 'dialog');
            dialog.name = arguments[0];
            dialog.description = arguments[1];
            dialog.append(yesButton, noButton);
            dialog.open = true;

            yesButton.addEventListener('click', function clickHandler(event) {
                self.onfulfilled();
                yesButton.removeEventListener('click', clickHandler);
            });

            noButton.addEventListener('click', function clickHandler(event) {
                self.onrejected();
                noButton.removeEventListener('click', clickHandler);
            });
        },

        // called when 'yesButton' is pressed
        onfulfilled: function(){},

        // called when 'noButton' is pressed
        onrejected: function(){}
    };

    return dialog;
})();




