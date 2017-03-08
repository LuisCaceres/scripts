var MouseEvent = (function () {
    'use strict';

    class MouseEvent extends Event {}
    return MouseEvent;
})();

global.MouseEvent = MouseEvent;