class Event {
    /**
     * Signals that something has occurred, e.g., that an image has completed downloading.
     */
    constructor() {
        this.target = new Element();
    }

    /**
     * Initializes the value of an event created using Document.createEvent().
     * @param {String} type
     * @param {Boolean} bubbles
     * @param {Boolean} cancelable
     */
    initEvent(type, bubbles, cancelable) {
        if (typeof type !== 'string') throw Error('"type" is not of type string.');
        if (typeof bubbles !== 'boolean') throw Error('"bubbles" is not of type boolean.');
        if (typeof cancelable !== 'boolean') throw Error('"cancelable" is not of type boolean.');

        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
    }

    /**
     * Signals to the operation that caused the event to be dispatched that it needs to be canceled.
     */
    preventDefault() {}

    /**
     * Prevents an event from reaching any objects other than the current object.
     */
    stopPropagation() {}
}


global.Event = Event;
