/* Event constructors such as KeyboardEvent, MouseEvent and FocusEvent are not exposed as functions on Internet Explorer 11. The 'typeof' operator returns 'object' instead of 'function'. The opposite happens on the rest of the major browsers where event constructors are functions. This means that event constructors cannot be used with the 'new' keyboard on Internet Explorer. The following is a polyfill that converts event constructors into functions on Internet Explorer. This effectively aligns Internet Explorer with the rest of the major browsers. The following polyfill is expected to be used in conjunction with unit test files. */

(function () {
    'use strict';

    if (typeof Event !== 'function') {
        /** Create a new Event.
         * @param {String} type - The name of the event.
         * @return {CustomEvent}
         */
        Event = function Event(type, eventInitDict) {
            // Get the configuration of the event.
            eventInitDict = eventInitDict || {};

            /** @type {Boolean} */
            const bubbles = eventInitDict.bubbles;
            /** @type {Boolean} */
            const cancellable = eventInitDict.cancellable;

            // Create an event.
            const event = document.createEvent('CustomEvent');
            // Apply the configuration of the event.
            event.initCustomEvent(type, bubbles, cancellable, undefined);

            return event;
        }
    }

    if (typeof FocusEvent !== 'function') {
        FocusEvent = function FocusEvent(type, eventInitDict) {
            const EVENT = document.createEvent('CustomEvent');

            /** @type {Boolean} */            
            var canBubble;
            switch (type) {
                case 'blur':
                case 'focus':
                    canBubble = false;    
                case 'focusout':
                case 'focusin':
                    canBubble = true;    
            }

            // Parameters are type, canBubble, cancelable, detail.
            EVENT.initCustomEvent(type, canBubble, false, undefined);

            for (let key in eventInitDict) {
                EVENT[key] = eventInitDict[key];
            }

            return EVENT;
        }
    }

    if (typeof KeyboardEvent !== 'function') {
        KeyboardEvent = function KeyboardEvent(type, eventInitDict) {
            const EVENT = document.createEvent('CustomEvent');
            // Parameters are type, canBubble, cancelable, detail.
            EVENT.initCustomEvent(type, true, true, undefined);

            for (let key in eventInitDict) {
                EVENT[key] = eventInitDict[key];
            }

            return EVENT;
        }
    }
 }());