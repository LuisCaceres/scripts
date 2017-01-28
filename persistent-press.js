/* Input devices such as a mouse, a pen, or a touchscreen may interact with an 
element. These interactions may trigger certain type of events including pointerdown, 
pointerup, pointerenter, etc. However, there is no way to detect a persistent press
by the pointer on an element. A persistent press event must prevent the execution 
of any click event handlers attached to the element. The following is an implementation 
of a new event type called 'persistentpress'. */

(function () {
    'use strict';

    // Creates an event for the application to listen for
    var persistentPressEvent = document.createEvent('Event');
    persistentPressEvent.initEvent('persistentpress', true, true);


    // This is the mininum amount of time an element must be continuously pressed down
    // to trigger the event
    var DELAY = 1000,
        timer = null;


    // Primary pointer button is pressed down on 'target'...
    document.addEventListener('mousedown', function (event) {
        // ...which may be an indication that a persistent press may occur. The application 
        // sets a timer that will let it know if that was the case.
        timer = setTimeout(function () {
            // Timer fires. It signals there's been a persistent press.
            event.target.dispatchEvent(persistentPressEvent);
            timer = null;
        }, DELAY);

        document.addEventListener('click', clickHandler, true);
    }, true);


    // Primary pointer button is released from 'target'.
    function clickHandler(event) {
        // There are two outcomes: a persistent press has occurred that prevents 'event'  
        // from reaching 'target'; or it didn't occur in which case the event flow remains 
        // unaffected
        timer === null ? event.stopPropagation() : clearTimeout(timer);
        document.removeEventListener('click', clickHandler, true); 
    }
})();