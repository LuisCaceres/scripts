// Let `ventana` be this module's namespace.
var ventana = ventana || {};

(function () {
    "use strict";

    /** Create a queue. It is a data structure somewhat similar to a stack.
     * Unlike a stack, a queue is open at both its ends. One end is always used
     * to insert data (enqueue) and the other is used to remove data (dequeue).
     * @constructor
     * @return {Queue}
     */
    function Queue() {
        // Let `elements` be an initially empty list of elements.
        // Associate `elements` and this queue.
        instances.set(this, []);
    };

    let prototype = Queue.prototype;


    /** Clear the queue. */
    prototype.clear = function () {
        // Let `elements` be the list of elements associated with this queue.
        // While `elements` is not empty.
            // Remove the element in the front terminal position in `elements`.
        const elements = instances.get(this);

        while (elements.length) {
            this.dequeue();
        }
    };

 
    /** Remove the element (if any) from the front terminal position of this
     * queue. */
    prototype.dequeue = function () {
        // Let `elements` be the list of elements associated with this queue.
        // Remove the element from the front terminal position in `elements`.
        // Let `element` be that element.
        // Fire a `dequeue` event.
        const elements = instances.get(this);
        const element = elements.pop();
        this.ondequeue(element);
    };

    
    /** Add an element to this queue.
     * @param {*} element The element to add to this queue.
     */
    prototype.enqueue = function (element) {
        // Let `elements` be the list of elements associated with this queue.
        // Add `element` to `elements`.
        // Fire an `enqueue` event.
        const elements = instances.get(this);
        elements.unshift(element);
        this.onenqueue(element);
    };


    prototype.onenqueue = function () {};
    prototype.ondequeue = function () {};




    /** Create a queue that is limited in capacity. If this queue is full,
     * the element in the front terminal position is automatically removed
     * before another one is added to the rear terminal position. This
     *  effectively prevents queue overflowing.
     * @constructor
     * @extends Queue
     * @param {Number} length The length (fixed) of the queue
     */
    function FixedQueue(length) {
        // Abort if `length` is not of type `number`.
        // Add a read-only `length` property to this queue whose value is `length`.
        if (!Number.isInteger(length)) {
            throw Error('TypeError');
        }

        Object.defineProperty(this, 'length', {
            writable: false,
            value: length
        });
        Queue.call(this);
    };

    prototype = FixedQueue.prototype = Object.create(Queue.prototype);
    prototype.constructor = FixedQueue;


    /** Add an element `element` to this queue. If this queue is full, the
     * element in the front terminal position is removed before `element` is
     * added. This prevents queue overflowing.
     * @param {*} element The element to add to this queue
     */
    prototype.enqueue = function (element) {
        // Let `elements` be the list of elements associated with this queue.
        // If `elements` is full.
            // Remove the element in the front terminal position of this queue.
        // Add `element` to this queue.
        const elements = instances.get(this);
        if (elements.length === this.length) {
            Queue.prototype.dequeue.call(this);
        }

        Queue.prototype.enqueue.call(this, element);
    }


    /** Throw an error if attempting to remove an element from this
     * queue. The implementation of a fixed queue does not allow the manual
     * removal of an element. This is done automatically when an element is
     * added and this queue is already full.
     */
    prototype.dequeue = function () {
        throw Error('Illegal invocation.');
    }


    // Let `instances` be a list of instances of Queue and FixedQueue.
    const instances = new WeakMap();

    ventana.Queue = Queue;
    ventana.FixedQueue = FixedQueue;
}());