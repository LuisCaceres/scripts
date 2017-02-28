class Event {
    /**
     * Signals that something has occurred, e.g., that an image has completed downloading.
     */
    constructor() {
        this.target = new Element();
        this.keyCode = random(8, 222);
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
        setTimeout(() => listener.call(this, new Event()), random(0, 2000));    
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


global.EventTarget = EventTarget;



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



class NodeList extends Array {}

global.NodeList = NodeList;



class Document extends Node {
    /**
     * Represents the entire HTML or XML document. Conceptually, it is the root of the 
     * document tree, and provides the primary access to the document's data.
     */
    constructor() {
        super();
    }

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
global.document = new Document();



class Element extends Node {
    /**
     * Represents an element in an HTML or XML document.
     */
    constructor() {
        super();
        this.parentElement = new ParentElement();
    }

    /**
     * Focuses the element.
     */
    focus() {
        if (typeof type !== 'string') throw Error('"type" is not of type string.');
        if (typeof bubbles !== 'boolean') throw Error('"bubbles" is not of type boolean.');
        if (typeof cancelable !== 'boolean') throw Error('"cancelable" is not of type boolean.');

        this.type = type;
        this.bubbles = bubbles;
        this.cancelable = cancelable;
    }

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
        return Boolean(random(0, 1));
    }
}

Element.prototype.querySelector = Document.prototype.querySelector;
Element.prototype.querySelectorAll = Document.prototype.querySelectorAll;


// ParentElement Interface (ficticious)
class ParentElement extends EventTarget {
    constructor() {
        super();
    }
}

global.Element = Element;



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