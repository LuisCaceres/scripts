/* Queue is an abstract data structure, somewhat similar to Stacks. Unlike stacks, 
a queue is open at both its ends. One end is always used to insert data (enqueue) 
and the other is used to remove data (dequeue). This is an implementation of this 
data structure. */


var Queue = (function () {
    "use strict";

    function Queue() {
        this.data = [];
    };

    var proto = Queue.prototype;

    proto.dequeue = function () {
        var enqueued = this.data.pop();
        this.ondequeue(enqueued);
    };

    proto.enqueue = function (value) {
        this.data.unshift(value);
        this.onenqueue(value);
    };

    proto.onenqueue = function(){};
    proto.ondequeue = function(){};

    return Queue;
})();




/* 'FixedQueue' extends 'Queue'. The main difference between instances of both constructors 
is that the length of an instance of 'FixedQueue' is fixed. The fixed queue will automatically
dequeue an item before enqueueing another one if the fixed queue is already full. */

var FixedQueue = (function () {
    "use strict";

    function FixedQueue(length) {
        this.length = length;
        Queue.call(this);
    };
    
    var proto = FixedQueue.prototype = Object.create(Queue.prototype);
    proto.constructor = FixedQueue;

    proto.enqueue = function (value) {
        if (this.data.length === this.length) {
            Queue.prototype.dequeue.call(this);
        }

        Queue.prototype.enqueue.call(this, value);
    }

    proto.dequeue = function() {
        throw Error('Illegal invocation.');
    }

    return FixedQueue;
})();