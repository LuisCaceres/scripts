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

    // IMPLEMENT SOME SORT OF ADDEVENTLISTENER INTERFACE
    proto.onenqueue = function(){};
    proto.ondequeue = function(){};

    return Queue;
})();


// when queue is full should we dequeue or enqueue first
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

    // There does not seem to be a better way to disable access to this function from the parent
    proto.dequeue = undefined;

    return FixedQueue;
})();




