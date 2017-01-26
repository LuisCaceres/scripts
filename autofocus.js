/* There are situations when it should be up to an application to set focus automatically.
For example, if the currently focused element is removed, the application is left 
in a state where no other element is focused. In this case, the application should
set focus to the next logical focusable element. The following program attempts 
to handle some of these situations. */

(function () {
    "use strict";

    // group of selectors as understood by css
    var defaultFocusableElements = 'a, button, input, select, textarea',
        focusableElements = defaultFocusableElements + ', [tabindex]';

    // SITUATION 1: the currently focused element is removed from the DOM. As a result,
    // the application lacks a focused element.
    document.addEventListener('remove', function (event) {
        var target = event.target,
            parent = target.parentElement;

        if (target !== document.activeElement) {
            // 'target' is not the currently focused element
            return;
        }

        var focusables = new Iterator(document.querySelectorAll(focusableElements));
        focusables.autoreset = true;
        focusables.find(target);

        setTimeout(function () {
            var previousFocusable = focusables.previous();
            focusables.next();
            var nextFocusable = focusables.next();

            if (nextFocusable.hasAttribute('tabindex') &&
                parent.contains(nextFocusable)) {                
                // assumes the next logical focusable and the currently focused element belong 
                // to the same composite widget, sets focus to the next logical focusable
                nextFocusable.focus();
                nextFocusable.tabIndex = 0;
            }

            else if (previousFocusable.hasAttribute('tabindex') &&
                parent.contains(previousFocusable)) {            
                // assumes the previous logical focusable and the currently focused element belong 
                // to the same composite widget, sets focus to the previous logical focusable
                previousFocusable.focus();
                previousFocusable.tabIndex = 0;
            }

            else {
                // otherswise sets focus to the next logical focusable (whatever it is)
                nextFocusable.focus();
            }
        }, 0);
    });
})();

/* NOTE: Upon opening a dialog window the first focusable descendant (in tree order) 
must gain focus. The piece of code controlling this behaviour is found in dialog.js. */

/* ISSUE 1: SEVERITY 2: Internet Explorer 11
1. The currently focused element is removed from the DOM through a click.
2. The application lacks a focused element.
3. The application will not set focus to another element.
*/


