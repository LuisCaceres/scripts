if (typeof window === 'undefined') {
    require('./../Browsing Context/browsing context.js');
}

/* Sometimes an application needs to be aware of any periods of inactivity. This
occurs when the user stops interacting with the application. For the purposes of
this implementation, an application becomes inactive when no user interface
events occur for a determinate amount of time. The application becomes active
once a user interface event occurs again. The following implementation triggers
both 'inactive' and 'active' events to which an application can subscribe to
react to any periods of inactivity/activity. */

(function () {
    'use strict';

    const APPLICATION_BECOMES_INACTIVE_AT = 5000; // milliseconds

    const inactiveEvent = document.createEvent('Event');
    inactiveEvent.initEvent('inactive', true, false);

    const activeEvent = document.createEvent('Event');
    activeEvent.initEvent('active', true, false);


    /** @type {Number} */
    var inactivityTimer = setTimeout(inactivityDetector,
        APPLICATION_BECOMES_INACTIVE_AT);


    /** Fires the active event.
     * @this {Element} - The target of the user interface event.
     * @listens Event.type === 'input'
     *          Event.type === 'scroll'
     *          KeyboardEvent.type === 'keydown'
     *          KeyboardEvent.type === 'keyup'
     *          PointerEvent.type === 'pointerdown'
     *          PointerEvent.type === 'pointermove'
     *          PointerEvent.type === 'pointerup'
     *          WheelEvent.type === 'wheel' 
     */
    function activityDetector() {
        document.dispatchEvent(activeEvent);
        // Sets the inactivity timer back to zero and starts ticking again.
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(inactivityDetector,
            APPLICATION_BECOMES_INACTIVE_AT);
    }


    /** Fires the inactive event.
     * @listens window#SetTimeout
     */
    function inactivityDetector() {
        // The application becomes inactive!
        document.dispatchEvent(inactiveEvent);
    }

    // The input event replaces keyboard events on mobile devices.
    document.addEventListener('input', activityDetector, true);
    document.addEventListener('keydown', activityDetector, true);
    document.addEventListener('keyup', activityDetector, true);
    document.addEventListener('pointerdown', activityDetector, true);
    document.addEventListener('pointermove', activityDetector, true);
    document.addEventListener('pointerup', activityDetector, true);
    document.addEventListener('scroll', activityDetector, true);
    document.addEventListener('wheel', activityDetector, true);
}());