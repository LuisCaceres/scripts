exports.document = {
    addEventListener(type, listener, useCapture) {
        if (typeof listener !== "function") {
            throw Error(`Failed to execute 'addEventListener()': parameter 'listener' is not of type function.`);
        }
    },

    querySelector() {}
};


