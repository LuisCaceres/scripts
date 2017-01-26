Iterator = (function () {
    "use strict";

    function Iterator(iterable /*, order*/) {
        this.order = arguments[1];
        this.index = -1;
        this.iterable = iterable; // should we create a copy of the iterable or just reference it?
    };

    var proto = Iterator.prototype;

    proto.autoreset = false;

    proto.current = function current() {
        return this.iterable[this.index];
    };

    proto.find = function find(value) {
        var index = Array.prototype.indexOf.call(this.iterable, value); // 'indexOf' will be 'undefined' if 'iterable' is not an instance of 'Array'.

        if (index > -1) {
            this.index = index;
            return true;
        }
        else {
            return false;
        }
    };

    proto.first = function first() {
        this.index = 0;
        return this.iterable[this.index];
    };

    proto.last = function last() {
        var iterable = this.iterable;
        this.index = iterable.length - 1;
        return iterable[this.index];
    };

    proto.next = function (value) {
        var index = ++this.index,
            iterable = this.iterable,
            order = this.order,
            length = order ? order.length : iterable.length;

        if (this.autoreset && index >= length) {
            index = this.index = 0;
        }

        if (order) {
            index = order[index];
        }

        return iterable[index];
    };

    // check case [0, 1, 2, 3, 4] current is 4 then [0, 1, 2, 3] then current(), then previous()
    proto.previous = function () {
        var index = this.index <= this.iterable.length ? --this.index : this.iterable.length - 1,
            iterable = this.iterable,
            order = this.order,
            length = order ? order.length : iterable.length;

        if (this.autoreset && index < 0) {
            index = this.index = length - 1;
        }

        if (order) {
            index = order[index];
        }

        return iterable[index];
    };

    return Iterator;
})();