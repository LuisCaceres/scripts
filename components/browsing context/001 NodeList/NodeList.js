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