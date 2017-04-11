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


    // Indicates if the iterator must be moved to the first or last position 
    // once it has reached the end or the beginning of the list.
    prototype.autoreset = false;

    /**
      * @return {*} The value located in the current position of the iterator.
      */
    prototype.current = function current() {
        return this.iterable[this.index];
    };

    /**
      * Moves the iterator to the first position in the list. 
      * @return {*} The value located in that position.
      */
    prototype.first = function first() {
        this.index = 0;
        return this.iterable[this.index];
    };

    /**
      * Moves the iterator to the last position in the list. 
      * @return {*} The value located in that position.
      */
    prototype.last = function last() {
        var iterable = this.iterable;
        this.index = iterable.length - 1;
        return iterable[this.index];
    };

     /**
      * Moves the iterator one position forward in the list. 
      * @return {*} The value located in that position.
      */
    prototype.next = function next() {
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
      * Moves the iterator to the position occupied by 'value' (if present in the list). 
      * @param {*} value The value to search for in the list.
      * @return {Boolean} true if the iterator was moved otherwise false.
      */
    prototype.positionAt = function positionAt(value) {
        var index = Array.prototype.indexOf.call(this.iterable, value);
        this.index = index > - 1 ? index : this.index;
        return !!(index > - 1);
    };
    
    /**
      * Moves the iterator one position backwards in the list. 
      * @return {*} The value located in that position.
      */
    prototype.previous = function previous() {
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
