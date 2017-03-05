var NodeList = (function () {
    'use strict';
    
    var traps = {
        set(obj, prop, val) {
            if (Number.isNaN(+prop) && prop !== 'length') {
                obj[prop] = val;
            }
        }
    }

    class NodeList {
        constructor(...items) {
            Array.prototype.push.apply(this, items);
            Object.freeze(this);
        }

    }

    NodeList.prototype.forEach = Array.prototype.forEach;
    NodeList.prototype.splice = function(){};

    return NodeList;
})();

global.NodeList = NodeList;