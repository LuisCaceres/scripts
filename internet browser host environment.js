console.log('Initiating the creation of a internet browser host environment.');

require('./components/Class Iterator/Class Iterator.js');
require('./components/Class Rectangle/Class Rectangle.js');



// Document Interface
function Document() {
    EventTarget.call(this);
}
global.Document = Document;

var prototype = Object.setPrototypeOf(Document.prototype, EventTarget.prototype);

prototype.querySelector = function querySelector(selector) {
    if (typeof selector !== 'string') {
        throw Error(`Failed to execute 'querySelector()': parameter 'selector' is not of type string.`);
    }

    return random(0, 1) ? new Element() : null;
};

prototype.querySelectorAll = function querySelectorAll(selector) {
    if (typeof selector !== 'string') {
        throw Error(`Failed to execute 'querySelector()': parameter 'selector' is not of type string.`);
    }

    var value = random(0, 1);
    if (value) {
        var list = new Array(random(1, 100));
        return list.map(() => new Element());
    }
    else {
        return [];
    }
};

global.document = new Document();








// Element Interfance
function Element() {
    this.parentElement = new ParentElement();
    EventTarget.call(this);
}
global.Element = Element;

var prototype = Object.setPrototypeOf(Element.prototype, EventTarget.prototype);

prototype.focus = function focus () {};

prototype.getBoundingClientRect = function getBoundingClientRect() {
    var rect = {
        bottom: Math.random(0, 100),
        left: Math.random(0, 100),
        right: Math.random(0, 100),
        top: Math.random(0, 100),
    };

    rect.height = Math.abs(rect.bottom - rect.height);
    rect.width = Math.abs(rect.right - rect.left);

    return rect;
}

prototype.matches = function matches(selector) {
    return Boolean(random(0, 1));
};

prototype.querySelector = Document.prototype.querySelector;
prototype.querySelectorAll = Document.prototype.querySelectorAll;










// Event Interface
function Event() {
    this.target = new Element();
    this.keyCode = random(8, 222);
};
global.Event = Event;

var prototype = Event.prototype;

prototype.preventDefault = function preventDefault() { };
prototype.stopPropagation = function stopPropagation() { };










// EventTarget Interface
function EventTarget() {
    this.eventListeners = new Set();
};

global.EventTarget = EventTarget;

var prototype = EventTarget.prototype;

prototype.addEventListener = function addEventListener(type, listener, useCapture) {
    if (typeof type !== "string") {
        throw Error(`Failed to execute 'addEventListener()': parameter 'type' is not of type string.`);
    }

    if (typeof listener !== "function") {
        throw Error(`Failed to execute 'addEventListener()': parameter 'listener' is not of type function.`);
    }

    this.eventListeners.add(listener);

    {
        let l = type === 'blur' ? 1 : 100;
        for (let i = 0; i < l; i++) {
            setTimeout(() => listener.call(this, new Event()), 0);
        }
    }
};

prototype.removeEventListener = function removeEventListener(type, listener, useCapture) {
    if (typeof type !== "string") {
        throw Error(`Failed to execute 'removeEventListener()': parameter 'type' is not of type string.`);
    }

    if (typeof listener !== "function") {
        throw Error(`Failed to execute 'removeEventListener()': parameter 'listener' is not of type function.`);
    }

    if (this.eventListeners.has(listener) === false) {
        throw Error(`Failed to execute 'removeEventListener()': parameter 'listener' is not present on the event listeners list.`);
    }
    else {
        this.eventListeners.delete(listener);
    }
};










// ParentElement Interfance (ficticious)
function ParentElement() {
    EventTarget.call(this);
}
ParentElement.prototype = Element.prototype;










// UTILITIES 
function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};










console.log('Creation of a internet browser host environment finalized.');