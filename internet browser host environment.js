console.log('Initiating the creation of a internet browser host environment.');

global.document = {
    addEventListener(type, listener, useCapture) {
        if (typeof type !== "string") {
            throw Error(`Failed to execute 'addEventListener()': parameter 'type' is not of type string.`);
        }

        if (typeof listener !== "function") {
            throw Error(`Failed to execute 'addEventListener()': parameter 'listener' is not of type function.`);
        }
    },

    querySelector() {}
};

console.log('Creation of a internet browser host environment finalized.');

