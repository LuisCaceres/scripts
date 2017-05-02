/* Event constructors such as KeyboardEvent, MouseEvent and FocusEvent are not exposed as functions on Internet Explorer. The 'typeof' operator returns 'object' instead of 'function'. The opposite happens on the rest of the major browsers where event constructors are functions. This means that event constructors cannot be used with the 'new' keyboard on Internet Explorer. The following is a polyfill that converts event constructors into functions on Internet Explorer. This effectively aligns Internet Explorer with the rest of the major browsers. The following polyfill is expected to be used in conjunction with unit test files. */

if (typeof KeyboardEvent !== 'function') {
    KeyboardEvent = function KeyboardEvent(type, eventInitDict) {
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, true, true, undefined); 

        for (let key in eventInitDict) {
            event[key] = eventInitDict[key];
        }

        return event;
    }
}