var EventTarget = (function () {
    'use strict';

    class EventTarget {
        constructor() {
            this.eventListenerList = new EventListenerList();
        }

        /**
         * Appends an event listener for events whose type attribute value is type. The callback
         * argument sets the callback that will be invoked when the event is dispatched. 
         * @param {String} type 
         * @param {Function} listener
         * @param {Boolean} useCapture
         */
        addEventListener(type, listener, useCapture) {
            if (typeof type !== "string") throw Error('"type" is not of type string.');
            if (typeof listener !== "function") throw Error('"listener" is not of type function.');

            this.eventListenerList.add(...arguments);

            // This is not meant to be here. For now, this function also invokes `listener`.
            for (let counter = 1000; counter; counter--) {
                let event = createEvent(type);
                event.initEvent(type, true, true);
                setTimeout(() => listener.call(this, event), random(0, 2000));
            }
        }

        /**
         * Dispatches a synthetic event event to target and returns true if either event's 
         * cancelable attribute value is false or its preventDefault() method was not invoked, 
         * and false otherwise.
         * @param {Event} event
         * @return {Boolean}
         */
        dispatchEvent(event) {
            if (!(event instanceof Event)) throw Error('"event" is not an instance of Event.');
            return Boolean(random(0, 1));
        }

        /**
         * Removes the event listener in target's list of event listeners with the same type, 
         * callback, and capture.
         * @param {String} type 
         * @param {Function} listener
         * @param {Boolean} useCapture
         */
        removeEventListener(type, listener, useCapture) {
            if (typeof type !== "string") throw Error('"type" is not of type string.');
            if (typeof listener !== "function") throw Error('"listener" is not of type function.');
            this.eventListenerList.remove(...arguments);
        }
    }




    var EventListenerList = (function () {
        'use strict';

        /**
         * Creates a list to which an event target's listeners may be added.
         */
        class EventListenerList {
            constructor() {
                this[list] = [];
            }

            /**
             * @param {String} type 
             * @param {Function} listener
             * @param {Boolean} useCapture
             * @return {Boolean}
             */
            add(type, listener, useCapture) {
                var index = this[list].findIndex(duplicate(...arguments));
                if (index === -1) {
                    this[list].push({
                        type: type,
                        listener: listener,
                        useCapture: useCapture
                    });

                    return true;
                }

                return false;
            }

            /**
             * @param {String} type
             * @param {Boolean} useCapture
             * @return {[{}]}
             */
            get(type, useCapture) {
                return this[list].filter(e => e.type === type);
            }

            /**
             * @param {String} type 
             * @param {Function} listener
             * @param {Boolean} useCapture
             * @return {Boolean}
             */
            remove(type, listener, useCapture) {
                var index = this[list].findIndex(duplicate(...arguments));

                if (index > -1) {
                    this[list].splice(index, 1);
                    return true;
                }

                return false;
            }
        }

        var list = Symbol();

        function duplicate(type, listener, useCapture) {
            return function (entry) {
                return entry.type === type &&
                    entry.listener === listener &&
                    entry.useCapture === useCapture;
            };
        }

        return EventListenerList;
    })();


  /**
    * Returns an event object of the type defined by the `type` parameter.
    * @param {String} type - The type of the event.
    * @return {Event} - An event object whose constructor is determined by the type of the event.
    */
  function createEvent(type) {
        switch (type) {
            case 'keydown':
            case 'keyup':
                return new KeyboardEvent();
                break;
            case 'pointerdown':
            case 'pointermove':
            case 'pointerup':
                return new PointerEvent();
                break;
            case 'input':
            case 'scroll':
                return new Event();
                break;
            case 'wheel':
                return new WheelEvent();
        }
    }

    return EventTarget;
})();


global.EventTarget = EventTarget;
