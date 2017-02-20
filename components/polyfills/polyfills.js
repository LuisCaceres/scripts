// Element.prototype.append()
// Document.prototype.append()
// DocumentFragment.append()
(function (prototypes) {

    var df = document.createDocumentFragment();

    function append() {
        var nodes = Array.from(arguments);

        nodes.forEach(function (node) {
            node = node instanceof Node ? node : document.createTextNode(node);
            df.appendChild(node);
        });

        this.appendChild(df);
    }

    prototypes.forEach(function (prototype) {
        if (!('append' in prototype)) {
            prototype.append = append;
        }
    });

})([Element.prototype, Document.prototype, DocumentFragment.prototype]);




// Element.prototype.closest()
if (!('closest' in Element.prototype)) {
    Element.prototype.closest = function (selector) {
        var element = this;

        while (element && element.nodeType === 1) {
            if (element.matches(selector)) {
                return element;
            }

            element = element.parentNode;
        }

        return null;
    };
}




// Element.prototype.matches()
if (!('matches' in Element.prototype)) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || function (selector) {
        var elements = element.ownerDocument.querySelectorAll(selector);

        var index = 0;
        while (elements[index] && 
               elements[index] !== element) {
            ++index;
        }

        return Boolean(elements[index]);
    };
}



// Element.prototype.remove()
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}




// NOTE: Implementation is incomplete.
// Array.from() 
if (!('from' in Array)) {
    Array.from = function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    }
}



// NOTE: Implementation has not been reviewed.
// Array.prototype.includes()
if (!('includes' in Array.prototype)) {
    Array.prototype.includes = function (searchElement, fromIndex) {

        // 1. Let O be ? ToObject(this value).
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
            return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 7. Repeat, while k < len
        while (k < len) {
            // a. Let elementK be the result of ? Get(O, ! ToString(k)).
            // b. If SameValueZero(searchElement, elementK) is true, return true.
            // c. Increase k by 1.
            // NOTE: === provides the correct "SameValueZero" comparison needed here.
            if (o[k] === searchElement) {
                return true;
            }
            k++;
        }

        // 8. Return false
        return false;
    }
}