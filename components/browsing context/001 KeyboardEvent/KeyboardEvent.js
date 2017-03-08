var KeyboardEvent = (function () {
    'use strict';

    class KeyboardEvent extends Event {
        constructor(type) {
            super();
            this.key = keys[random(0, keys.length - 1)];
            this.repeat = Boolean(random(0, 1));
        }
    }

    var keys = [
        'Enter',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    return KeyboardEvent;
})();

global.KeyboardEvent = KeyboardEvent;

// NOTES:
// 1. A booloean value `keyboardEvent.repeat` is currently randomly generated.
//    The value must be generated taking into account the previous key pressed
//    and the amount of time that has elapsed since that key was pressed.
