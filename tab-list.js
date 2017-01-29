/* An element marked with the role 'tablists' is a list of tab elements, which 
are references to tabpanel elements. The following is an implements the behaviour
of the roles 'tablist', 'tab' and 'tabpanel' as specified by the Accessible Rich
Internet Applications (ARIA). */

(function () {
    'use strict';

    document.addEventListener('focus', function tabDetector(event) {

        if (document.activeElement.matches('[role="tab"]')) {
            let tab = document.activeElement;
            tab.addEventListener('blur', blurHandler);
            tab.addEventListener('click', clickAndKeydownHandler);
            tab.addEventListener('keydown', clickAndKeydownHandler);
        }
    }, true);


    function blurHandler() {
        var tab = this;
        tab.removeEventListener('blur', blurHandler);
        tab.removeEventListener('click', clickAndKeydownHandler);
        tab.removeEventListener('keydown', clickAndKeydownHandler);
    }


    // toggles the boolean value of the 'aria-expanded' attribute of a tab
    function clickAndKeydownHandler(event) {
        var type = event.type,
            key = event.keyCode;

        if (type === 'click' ||
           (type === 'keydown' && (key === 13 || key === 32))) {

            let tab = this,
                val = this.getAttribute('aria-expanded') === 'true' ? false : true;

            this.setAttribute('aria-expanded', val);

            event.preventDefault();
            event.stopPropagation();
        }
    };
})();

/* NOTE: A <tablist> SHOULD not be a descendant of another <tablist>. 
Unexpected behaviour may arise due to such a structure in the markup. */