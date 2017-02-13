/* The Iterator interface represents an iterator over the members of a list of  
data. The data is ordered by an index value. This includes arrays and array-like
constructs such as Array objects and TypedArray objects. */

var Iterator = (function () {
    "use strict";

    /**
      * Creates an iterator over the members of 'iterable'. 
      * @param iterable An array or array-like object.
      * @returns An iterator.
      */
    function Iterator(iterable /*, order*/) {
        this.order = arguments[1];
        this.index = -1;
        this.iterable = iterable;
    };


    var prototype = Iterator.prototype;


    // Indicates if the iterator should be moved to the first or last position once 
    // the iterator has reached the beginning or the end of the list.
    prototype.autoreset = false;


    /**
      * @returns The value located in the current position of the iterator.
      */
    prototype.current = function current() {
        return this.iterable[this.index];
    };


    /**
      * Moves the iterator to the position occupied by 'value' as long as 'value' is present in the list. 
      * @param value The value to search for in the list.
      * @returns true if 'value' was found otherwise false.
      */
    prototype.positionAt = function positionAt(value) {
        var index = Array.prototype.indexOf.call(this.iterable, value);

        if (index > -1) {
            this.index = index;
            return true;
        }
        return false;
    };


    /**
      * Moves the iterator to the first position in the list. 
      * @returns The value located in the first position in the list.
      */
    prototype.first = function first() {
        this.index = 0;
        return this.iterable[this.index];
    };


    /**
      * Moves the iterator to the last position in the list. 
      * @returns The value located in the last position in the list.
      */
    prototype.last = function last() {
        var iterable = this.iterable;
        this.index = iterable.length - 1;
        return iterable[this.index];
    };


     /**
      * Moves the iterator one position forward in the list. 
      * @returns The value located in that new position of the iterator.
      */
    prototype.next = function (value) {
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


    /**
      * Moves the iterator one position backwards in the list. 
      * @returns The value located in that new position of the iterator.
      */
    prototype.previous = function () {
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

if (typeof global !== 'undefined') global.Iterator = Iterator;
