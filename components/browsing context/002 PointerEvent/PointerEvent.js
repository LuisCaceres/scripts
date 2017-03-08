var PointerEvent = (function () {
    'use strict';

    class PointerEvent extends MouseEvent {
        constructor(type) {
            super();
            this.type = type;
        }
    }

    return PointerEvent;
})();

global.PointerEvent = PointerEvent;