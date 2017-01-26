// ChildNode.prototype.remove()
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}




// ParentNode.prototype.append()
(function (arr) {
    arr.forEach(function (item) {
        item.append = item.append || function () {
            var argArr = Array.prototype.slice.call(arguments);
            var docFrag = document.createDocumentFragment();

            argArr.forEach(function (argItem) {
                var isNode = Boolean(typeof (argItem) === 'object' && argItem !== null && argItem.nodeType > 0);
                docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
            });

            this.appendChild(docFrag);
        };
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);




// Element.prototype.closest() and Element.prototype.matches()
(function (ElementProto) {
    if (typeof ElementProto.matches !== 'function') {
        ElementProto.matches = ElementProto.msMatchesSelector || function matches(selector) {
            var element = this;
            var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
            var index = 0;

            while (elements[index] && elements[index] !== element) {
                ++index;
            }

            return Boolean(elements[index]);
        };
    }

    if (typeof ElementProto.closest !== 'function') {
        ElementProto.closest = function closest(selector) {
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
})(window.Element.prototype);


// NOTE: The implementation of Array.from is incomplete
// Array.from 
if (Array.from === undefined) {
    Array.from = function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    }
}


// Array.prototype.includes
if (Array.prototype.includes === undefined) {
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

// QUESTION: Is there really a use case for this? Symbol cannot be polyfilled.
// HTMLCollection.prototype[Symbol.iterator]
/*
if (typeof Symbol === 'function' && 
    HTMLCollection.prototype[Symbol.iterator] === undefined) {
    NodeList.prototype[Symbol.iterator] = function *values() {
       var counter = 0;
       while (counter < this.length) {
           yield this[counter++];
       }
    }
}
*/