/* An element responds to input from devices such as a mouse, a pen, or a touchscreen.
This may trigger events such as pointerdown, pointerup, pointerenter, pointerleave, 
etc. However, sometimes it is desired that an event is triggered in response to 
maintaining a 'persistent press' on an element. The following piece of code implements 
a new type of event called 'persistentpress'. */

(function () {
    "use strict";

    // a 'persistentpress' event will be triggered after the following amout of time
    var DELAY = 1000;


    // creates a 'persistentpress' event for the application to listen for
    var persistentPressEvent = document.createEvent('Event');
    persistentPressEvent.initEvent('persistentpress', true, true);


    // If active, a 'persistentpress' event prevents the invokation of any listeners 
    // for click events. 
    var preventsClickEvent = false;


    var blurHandler = function blurHandler(event) {
        this.removeEventListener('blur', blurHandler);
        this.removeEventListener('click', clickHandler);  
    }


    var clickHandler = function clickHandler(event) {
        if (preventsClickEvent) {
            // at this point it is clear that a 'persistentpress' has occurred, any listeners
            // for click events attached to 'event.target' will be ignored.
            event.stopImmediatePropagation();
        }

        // listeners for a subsequent click event may be invoked again
        preventsClickEvent = false;
    };



    var timeoutHandler = function (activeElement) {
        activeElement.dispatchEvent(persistentPressEvent);
        preventsClickEvent = true;
    }


    // sets a timer whose callback dispatches a 'persistentpress' event. For example,
    // this occurs when a mouse button is pressed on an element. If the button is released
    // after the timer fires it is an indication that a 'persistentpress' event has 
    // occured. Consequently, any listeners for click events will not be invoked. 
    // However, if the button is released before the timer fires a 'persistentpress' 
    // event is not triggered. Any listeners for click events will be invoked.
    var persistentPressDetector = (function () {
        var timeoutID = null;

        return function persistentPressDetector(event) {
            var eventType = event.type;

            if (eventType === "mousedown") {
                timeoutID = setTimeout(timeoutHandler, DELAY, event.target);
            }
            else if (eventType === "mouseup") {
                if (timeoutID !== null) {
                    clearTimeout(timeoutID);
                }
            }
        };
    })();


   // once an element gains focus a 'persistentpress' may be produced. Through some dependent
   // event listeners the program may detect a persistent press.
    document.addEventListener('focus', function () {
        var activeElement = document.activeElement;
        activeElement.addEventListener('blur', blurHandler);
        activeElement.addEventListener('click', clickHandler);
    }, true);

    
    document.addEventListener('mousedown', persistentPressDetector);
    document.addEventListener('mouseup', persistentPressDetector);
})();


/* NOTE: This piece of code will work as expected as long as listeners for a click event
are attached on the target element after line 80 has executed. In other words, the listener 
referenced on line 80 MUST BE THE VERY FIRST ONE ATTACHED. Otherwise, calling 'stopImmediatePropagation()' 
will have no effect on previously attached listeners. */

/* ISSUE: */