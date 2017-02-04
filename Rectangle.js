var Rectangle = (function () {
    'use strict';

    function Rectangle(x, y, width, height) {
        this.left = x;
        this.right = x + width;
        this.top = y;
        this.bottom = y + height;
        this.width = width;
        this.height = height;
    }

    Rectangle.from = function (element) {
        var bcr = element.getBoundingClientRect();
        return new Rectangle(bcr.left, bcr.top, bcr.width, bcr.height);
    };

    var prototype = Rectangle.prototype;

    prototype.positionFrom = function octantFrom(rectangle) {
        var isAbove = rectangle.top > this.bottom ? true : false,
            isBelow = rectangle.bottom < this.top ? true : false,
            isToTheLeft = rectangle.left >= this.right ? true : false,
            isToTheRight = rectangle.right <= this.left ? true : false;

        if (isAbove) {
            if (isToTheRight) return 1;
            if (isToTheLeft) return 3;
            return 2;
        }

        if (isBelow) {
            if (isToTheRight) return 7;
            if (isToTheLeft) return 9;
            return 8;
        }

        if (isToTheLeft) return 4;
        if (isToTheRight) return 6;
    };

    prototype.coordsFrom = function positionFrom(rectangle) {
        return {
            x: Math.abs(rectangle.left - this.left),
            y: Math.abs(rectangle.top - this.top)
        }
    }

    return Rectangle;
})();