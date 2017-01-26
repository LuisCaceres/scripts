(function () {
    'use strict';

    var tab = null;
 



    function toggle(tab) {
        if (tab.getAttribute('aria-expanded') === 'false') {
            tab.setAttribute('aria-expanded', 'true');
            tab.nextElementSibling.setAttribute('aria-hidden', false);
        }
        else {
            tab.setAttribute('aria-expanded', 'false');
            tab.nextElementSibling.setAttribute('aria-hidden', true);
        }
    }




    var blurHandler = function blurHandler() {
        var tab = this;
        tab.removeEventListener('blur', blurHandler);
        tab.removeEventListener('click', clickAndKeydownHandler);
        tab.removeEventListener('keydown', clickAndKeydownHandler);
    }




    var clickAndKeydownHandler = function clickAndKeydownHandler(event) {

        if (document.activeElement.matches('[role=tab]') === false) {
            return;
        }

        let eventType = event.type,
            keyCode = event.keyCode;

        if (eventType === 'click' ||
           (eventType === 'keydown' && (keyCode === 13 || keyCode === 32))) {
            toggle(this);
            event.preventDefault();
            event.stopPropagation();
        }
    };




    document.addEventListener('focus', function tabDetector(event) {

        if (document.activeElement.matches('[role="tab"]')) {
            tab = document.activeElement;
            tab.addEventListener('blur', blurHandler);
            tab.addEventListener('click', clickAndKeydownHandler);
            tab.addEventListener('keydown', clickAndKeydownHandler);
        }
    }, true);
})();


/* NOTE: A <tablist> SHOULD not be a descendant of another <tablist>. 
Unexpected behaviour may arise due to such a structure in the markup. */