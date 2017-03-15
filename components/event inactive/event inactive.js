if (typeof window === 'undefined') require('./../Browsing Context/browsing context.js');

/* Sometimes an application needs to be aware of any periods of inactivity. This 
occurs when the user stops interacting with the application. For the purposes of 
this implementation, an application becomes inactive when no user interface events
occur for a determinate amount of time. The application becomes active once a user 
interface event occurs again. The following implementation triggers both 'inactive' 
and 'active' events to which an application can subscribe to react to any periods
of inactivity/activity. */

(function () {
    'use strict';

    const APP_BECOMES_INACTIVE_AT = 5000;    // 5 seconds

    var inactiveEvent = document.createEvent('Event');
    inactiveEvent.initEvent('inactive', true, false);

    var activeEvent = document.createEvent('Event');
    activeEvent.initEvent('active', true, false);

    var documentIsInactive = false;
    
    var timer;

    function inactivityDetector() {
        if (documentIsInactive) {
            // A user interface event has occured. The document becomes active.
            documentIsInactive = false;
            document.dispatchEvent(activeEvent);
        }
   
        clearTimeout(timer);
        
        // Sets a timer which fires if no user interface events have occured.
        timer = setTimeout(function () {
            // Document becomes inactive due to lack of user activity.
            documentIsInactive = true;
            document.dispatchEvent(inactiveEvent);
        }, APP_BECOMES_INACTIVE_AT);
    }

    // Replaces keyboard events on mobile devices due to lack of support for obvious reasons
    document.addEventListener('input', inactivityDetector, true);
    document.addEventListener('keydown', inactivityDetector, true);
    document.addEventListener('keyup', inactivityDetector, true);
    document.addEventListener('pointerdown', inactivityDetector, true);
    document.addEventListener('pointermove', inactivityDetector, true);
    document.addEventListener('pointerup', inactivityDetector, true);
    document.addEventListener('scroll', inactivityDetector, true);
    document.addEventListener('wheel', inactivityDetector, true);

    inactivityDetector();
})();
