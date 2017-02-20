if (typeof window === 'undefined') require('./../Browsing Context/browsing context.js');

/* Sometimes an application needs to be aware of any periods of inactivity. This 
occurs when the user stops interacting with the application. For the purposes of 
this implementation, an application becomes inactive when it has not received any 
input from the user through an input device (keyboard, mouse, etc.). The following 
implementation triggers an 'inactive' event to which an application can subscribe 
in order to react to any periods of inactivity. */

(function () {
    'use strict';

    const DELAY = 5000;

    var inactiveEvent = document.createEvent('Event');
    inactiveEvent.initEvent('inactive', true, false);

    var activeEvent = document.createEvent('Event');
    activeEvent.initEvent('active', true, false);

    var timer;

    function inactivityDetector() {
        if (timer === null) {
            document.dispatchEvent(activeEvent);
        }
   
        clearTimeout(timer);
        timer = setTimeout(function () {
            timer = null;
            document.dispatchEvent(inactiveEvent);
        }, DELAY);
    }

    document.addEventListener('keydown', inactivityDetector, true);
    document.addEventListener('keyup', inactivityDetector, true);
    document.addEventListener('pointerdown', inactivityDetector, true);
    document.addEventListener('pointermove', inactivityDetector, true);
    document.addEventListener('pointerup', inactivityDetector, true);
    document.addEventListener('scroll', inactivityDetector, true);

    inactivityDetector();
})();