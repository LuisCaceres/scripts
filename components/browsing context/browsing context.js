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
            return !!random(0, 1);
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
            case 'blur':
            case 'focus': 
                return new FocusEvent();
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




var KeyboardEvent = (function () {
    'use strict';

    class KeyboardEvent extends Event {
        constructor(type) {
            super();
            this.key = keys[random(0, keys.length - 1)];
            this.repeat = !!random(0, 1);
        }
    }

    var keys = [
        'Enter', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    return KeyboardEvent;
})();

global.KeyboardEvent = KeyboardEvent;

// NOTES:
// 1. A booloean value `keyboardEvent.repeat` is currently randomly generated.
//    The value must be generated taking into account the previous key pressed
//    and the amount of time that has elapsed since that key was pressed.



var MouseEvent = (function () {
    'use strict';

    class MouseEvent extends Event {}
    return MouseEvent;
})();

global.MouseEvent = MouseEvent;



var Node = (function () {
    'use strict';
   
    var ancestors = Symbol('ancestors'),
        parent = Symbol('parent');

    class Node extends EventTarget {
        constructor() {
            super();
            this.childNodes = [];
            this[parent] = null;
        }


        /**
         * Adds a node to the end of the list of children of this node. 
         * @param {Node} node
         */
        appendChild(node) {
            if (!(node instanceof Node)) throw Error('"node" is not an instance of Node.');
            // If this node attempts to append itself.
            if (this === node) throw Error('This node cannot append itself as a child.');
            // If 'node' is an ancestor of this node.
            if (this[ancestors].includes(node)) throw Error('The node to be appended contains this node.');

            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }

            this.childNodes.push(node);
            node[parent] = this;

            return node;
        }


        /**
         * Returns the first child of this node. 
         * @return {Node|null}
         */
        get firstChild() {
            return this.childNodes[0] || null;
        }


        /**
         * Returns the last child of this node. 
         * @param {Node|null}
         */
        get lastChild() {
            var childNodes = this.childNodes,
                length = childNodes.length;

            return childNodes[length - 1] || null;
        }


        /**
         * Returns the parent of this node. 
         * @param {Node|null}
         */
        get parentNode() {
            return this[parent];
        }


        /**
         * Removes this node from its parent's list of children.
         * @param {Node} node
         */
        remove() {
            this.parentNode.removeChild(this);
        }


        /**
         * Removes the child node indicated by 'node' from the list of children, and returns it.
         * @param {Node} node
         */
        removeChild(node) {
            var childNodes = this.childNodes;

            if (!(node instanceof Node)) throw Error('"node" is not an instance of Node.');
            // if 'node' is not a child of this node.
            if (!childNodes.includes(node)) throw Error('The node to be removed is not a child of this node.');

            {   let index = childNodes.indexOf(node);
                childNodes.splice(index, 1);
                node[parent] = null;
            }
        }


        /**
         * 
         * @return {[Node]}
         */
        get [ancestors]() {
            var ancestors = [],
                ancestor = this.parentNode;

            while (ancestor) {
                ancestors.push(ancestor);
                ancestor = ancestor.parentNode;
            }

            return ancestors;
        }
    }

    return Node;
})();

global.Node = Node;

// Note: childNodes should not be an instance of Array



var NodeList = (function () {
    'use strict';
    
    class NodeList {
        constructor(...items) {
            Array.prototype.push.apply(this, items);
            Object.freeze(this);
        }
    }

    NodeList.prototype.forEach = Array.prototype.forEach;

    // Curiously, a node list is visually output to the console as an array as long 
    // as there is a `splice` method. 
    NodeList.prototype.splice = function(){};

    return NodeList;
})();

global.NodeList = NodeList;



/**
 * Represents the entire HTML or XML document. Conceptually, it is the root of the 
 * document tree, and provides the primary access to the document's data.
 */
class Document extends Node {
    /**
     * Creates an event of the type specified.
     * @param {String} type
     * @return {Event}
     */
    createEvent(type) {
        if (typeof type !== 'string') throw Error('"type" is not of type string.');
        return new Event();
    }

    /**
     * Returns the first element that is a descendant that matches selectors.
     * @param {String} selectors
     * @return {Element|null}
     */
    querySelector(selectors) {
        if (typeof selectors !== 'string') {
            throw Error('"selector" is not of type string.');
        }

        return random(0, 1) ? new Element() : null;
    }

    /**
     * Returns all element descendants that match selectors.
     * @param {String} selectors
     * @return {[Element]}
     */
    querySelectorAll(selectors) {
        if (typeof selectors !== 'string') {
            throw Error('"selector" is not of type string.');
        }

        var value = random(0, 1);
        if (value) {
            new Array(random(1, 100)).map(() => new Element());
        }
        else {
            return [];
        }
    }
}


global.Document = Document;



/**
 * Represents an element in an HTML or XML document.
 */
class Element extends Node {

    /**
     * Focuses the element.
     */
    focus() {}

    /**
     * Returns the size of an element and its position relative to the viewport.
     * @returns {{}}
     */
    getBoundingClientRect() {
        var top = random(0, 100),
            bottom = random(top, top + 100),
            left = random(0, 100),
            right = random(left, left + 100);

        return {
            top, bottom, left, right,
            width: Math.abs(right - left),
            height: Math.abs(bottom - top)
        };
    }

    /**
     * Returns true if matching selectors against the element’s root yields element, 
     * and false otherwise.
     * @param {String} selectors
     * @returns {Boolean}
     */
    matches(selectors) {
        if (typeof selectors !== 'string') throw Error("'selector' is not of type string.");
        return !!random(0, 1);
    }
}

Element.prototype.querySelector = Document.prototype.querySelector;
Element.prototype.querySelectorAll = Document.prototype.querySelectorAll;

global.Element = Element;



var PointerEvent = (function () {
    'use strict';

    class PointerEvent extends MouseEvent {
        constructor(type) {
            super();
            this.type = type;
        }
    }

    return PointerEvent;
})();

global.PointerEvent = PointerEvent;



var WheelEvent = (function () {
    'use strict';

    class WheelEvent extends MouseEvent {}
    return WheelEvent;
})();

global.WheelEvent = WheelEvent;




// MISCELLANEOUS
require('./../Class Iterator/Class Iterator.js');
require('./../Class Rectangle/Class Rectangle.js');


function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};

// this should be the very last line of code as the execution of the following 
// depends on the availability (non-undefined) classes.



// creates Document Object Model Tree
{
    let document = global.document = new Document(),
        html = new Node(),
        body = new Node(),
        head = new Node();

    document.body = body;
    document.head = head;
    document.rootElement = html;

    document.appendChild(html);
    html.appendChild(head);
    html.appendChild(body);
}