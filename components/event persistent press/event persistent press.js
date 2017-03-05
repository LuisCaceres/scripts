if (typeof window === 'undefined') require('./../Browsing Context/browsing context.js');

/* A user interacts with the elements of an application in various manners. These 
interactions trigger certain type of events (e.g., `pointerdown`, `pointerup`, 
`pointerenter`, etc). However, there is no way to detect a persistent press
on an element. A persistent press event must prevent the execution of any click 
event handlers attached to the element. The following is an implementation of a 
new event type called 'persistentpress'. */

(function () {
    'use strict';

    // Creates an event object for the persistent press event.
    var persistentPressEvent = document.createEvent('Event');
    persistentPressEvent.initEvent('persistentpress', true, false);


    // The event is triggered if the press on a element lasts `DELAY` milliseconds. 
    const DELAY = 3000;
    
    
    // A timer counts the number of milliseconds elapsed since the press starts.
    var timer = null;


    var body = document.body;

    // Triggers of a persistent press event include a keyboard, mouse, pen, finger, etc.
    body.addEventListener('keydown', onPress, true);
    body.addEventListener('pointerdown', onPress, true);    


    function onPress(event) {
        // ES6 syntax (object destructuring)
        // var { keyCode, repeat, type } = event;

        var keyCode = event.keyCode,
            repeat = event.repeat,
            type = event.type;

        // Aborts if the key pressed is not ENTER (`keydown` event only).
        if (type === 'keydown' && (keyCode !== 13 || repeat)) { 
            return; 
        }
    
        // Starts to count milliseconds
        timer = setTimeout(function () {
            event.target.dispatchEvent(persistentPressEvent);
            timer = null;
        }, DELAY);

        // 'pointerdown' becomes 'pointerup' and 'keydown' becomes 'keyup'
        type = type.replace('down', 'up');
        // Controls what happens when the press on an element stops
        body.addEventListener(type, onPressStops, true);  
    }


    function onPressStops(event) {
        // If a persistent press event was triggered then the event flow is interrupted,  
        // otherwise it remains unaffected
        timer === null ? event.stopPropagation() : clearTimeout(timer);
        body.removeEventListener(event.type, onPressStops, true); 
    }
})();

// NOTES: Even though 'KeyboardEvent.repeat' is defined on IE11, it always reports false;
// NOTES: When more than two keys are attached to the persistent press behaviour then bugs are present
// NOTE: Try TimeStamp instead of setTimeout
// How about timer.fired??? new Number(1), is it okay to treat a primitive value a number;
// Please test on <button> and <a>
// NOTES ADD BROWSER CONTEXT FUNCTIONALITY