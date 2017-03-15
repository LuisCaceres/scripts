var WheelEvent = (function () {
    'use strict';

    class WheelEvent extends MouseEvent {}
    return WheelEvent;
})();

global.WheelEvent = WheelEvent;
