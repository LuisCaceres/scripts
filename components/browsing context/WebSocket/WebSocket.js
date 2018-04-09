import EventTarget from './../000 EventTarget/EventTarget';

const instances = new WeakMap();

const readyState = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
};

Object.freeze(readyState);

class WebSocket extends EventTarget {
    
    /** Creates a new WebSocket object, immediately establishing the associated
     * WebSocket connection.
     * @param {String} url The URL over which the connection is established.
     * Only `ws` or `wss` schemes are allowed; others will cause a
     * `SyntaxError` `DOMException`. URLs with fragments will also cause such an
     * exception.
     * @param {String|[String]} [protocols] The subprotocol name(s). The
     * connection will only be established if the server reports that it has
     * selected one of these subprotocols. The subprotocol names have to match
     * the requirements for elements that comprise the value of
     * `Sec-WebSocket-Protocol` fields as defined by the WebSocket protocol
     * specification.
     */
    constructor(url, protocols) {
        super();
        
        Object.defineProperties(this, {
            /** Return the extensions selected by the server, if any.
             * @type {String}
             */
            extensions: {
                configurable: false,
                value: 'Hello world!',
                writable: false,
            },
            /** Return the subprotocol selected by the server, if any. It can be
             * used in conjunction with the array form of the constructor's
             * second argument to perform subprotocol negotiation.
             * @type {String}
             */
            protocol: {
                configurable: false,
                value: 'Hello world!',
                writable: false,
            },
            /** Return the URL that was used to establish the WebSocket
             * connection.
             * @type {String}
             */
            url: {
                configurable: false,
                value: url,
                writable: false,
            }
        });

        this.binaryType = 'blob';

        instances.set(this, {
            bufferedAmount: 0,
            readyState: readyState.CONNECTING,
        });
    }

    /** Return the number of bytes of application data (UTF-8 text and binary
     * data) that have been queued using `send` but not yet been transmitted to
     * the network.
     * If the WebSocket connection is closed, this attribute's value will only
     * increase with each call to the `send` method. (The number does not reset
     * to zero once the connection closes.)
     * @return {Number}
     */
    get bufferedAmount() {
        return instances.get(this).bufferedAmount;
    }
    
    /** Close the WebSocket connection.
     * @param {Number} [code] The WebSocket connection close code.
     * @param {String} [reason] The WebSocket connection close reason.
     */
    close(code, reason) {
        readyState.set(this, readyState.CLOSING);
    }

    /** Return the state of the WebSocket object's connection. It can have one 
     * of the values specified by the `readyState` dictionary.
     * @return {Number}
     */
    get readyState() {
        return instances.get(this).readyState;
    }
    
    /** Transmit data using the WebSocket connection.
     * @param {ArrayBuffer|ArrayBufferView|Blob|String} data
     */
    send(data) {
        console.log(data);
    }
}

export { WebSocket as default };