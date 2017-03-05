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
        return Boolean(random(0, 1));
    }
}

Element.prototype.querySelector = Document.prototype.querySelector;
Element.prototype.querySelectorAll = Document.prototype.querySelectorAll;

global.Element = Element;