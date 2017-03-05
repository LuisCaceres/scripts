class Document extends Node {
    /**
     * Represents the entire HTML or XML document. Conceptually, it is the root of the 
     * document tree, and provides the primary access to the document's data.
     */
    constructor() {
        super();
        this.body = new Element();
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