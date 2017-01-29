/* An instance of Iterator is an iterator over the members of an indexed collection.
The following is the implementation. */

var Iterator = (function () {
    "use strict";

    // constructs an iterator. 'iterable' must be an indexed collection 
    function Iterator(iterable /*, order*/) {
        this.order = arguments[1];
        this.index = -1;
        this.iterable = iterable;
    };

    var proto = Iterator.prototype;


    // indicates whether the iterator must be automatically moved to the first or last
    // position once 'iterable' has been exhausted
    proto.autoreset = false;


    // returns the element referenced by the iterator
    proto.current = function current() {
        return this.iterable[this.index];
    };


    // moves the iterator to the position occupied by 'value' if it is present in 'iterable'.
    // returns 'true' if 'value' is found otherwise 'false' 
    proto.find = function find(value) {
        // 'indexOf' is accessed from 'Array.prototype' since 'iterable' may not have access 
        // to this method through the prototype chain.
        var index = Array.prototype.indexOf.call(this.iterable, value);

        if (index > -1) {
            this.index = index;
            return true;
        }
        else {
            return false;
        }
    };


    // moves the iterator to the first position and returns the referenced element
    proto.first = function first() {
        this.index = 0;
        return this.iterable[this.index];
    };


    // moves the iterator to the last position and returns the referenced element
    proto.last = function last() {
        var iterable = this.iterable;
        this.index = iterable.length - 1;
        return iterable[this.index];
    };


    // moves the iterator one position forward and returns the referenced element
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


    // moves the iterator one position backwards and returns the referenced element
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