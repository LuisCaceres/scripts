var Node = (function () {
    'use strict';
   
    var ancestors = Symbol('ancestors'),
        parent = Symbol('parent');

    class Node extends EventTarget {
        constructor() {
            super();
            this.childNodes = [];
            this[parent] = null;
        }


        /**
         * Adds a node to the end of the list of children of this node. 
         * @param {Node} node
         */
        appendChild(node) {
            if (!(node instanceof Node)) throw Error('"node" is not an instance of Node.');
            // If this node attempts to append itself.
            if (this === node) throw Error('This node cannot append itself as a child.');
            // If 'node' is an ancestor of this node.
            if (this[ancestors].includes(node)) throw Error('The node to be appended contains this node.');

            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }

            this.childNodes.push(node);
            node[parent] = this;

            return node;
        }


        /**
         * Returns the first child of this node. 
         * @return {Node|null}
         */
        get firstChild() {
            return this.childNodes[0] || null;
        }


        /**
         * Returns the last child of this node. 
         * @param {Node|null}
         */
        get lastChild() {
            var childNodes = this.childNodes,
                length = childNodes.length;

            return childNodes[length - 1] || null;
        }


        /** Return the node immediately following this node. If there is no such
         * node, this returns null.
         * @return {Node|null}
         */
        get nextSibling() {
            // Let 'parent' be the parent node of this node.
            const parent = this.parentNode;
            // Let 'children' be the child nodes of 'parent'.
            const children = parent.childNodes;
            // Let 'INDEX' be the position of this node amongst 'children'.
            const INDEX = children.indexOf(this);
            // Let 'sibling' be the sibling of this node positioned immediately after 'INDEX'.
            const sibling = children[INDEX + 1] || null;
            // Return 'sibling'.
            return sibling;
        }


        /** Return the node immediately preceding this node. If there is no such
         * node, this returns null.
         * @return {Node|null}
         */
        get previousSibling() {
            // Let 'parent' be the parent node of this node.
            const parent = this.parentNode;
            // Let 'children' be the child nodes of 'parent'.
            const children = parent.childNodes;
            // Let 'INDEX' be the position of this node amongst 'children'.
            const INDEX = children.indexOf(this);
            // Let 'sibling' be the sibling of this node positioned immediately before 'INDEX'.
            const sibling = children[INDEX - 1] || null;
            // Return 'sibling'.
            return sibling;
        }


        /**
         * Returns the parent of this node. 
         * @param {Node|null}
         */
        get parentNode() {
            return this[parent];
        }


        /**
         * Removes this node from its parent's list of children.
         * @param {Node} node
         */
        remove() {
            this.parentNode.removeChild(this);
        }


        /**
         * Removes the child node indicated by 'node' from the list of children, and returns it.
         * @param {Node} node
         */
        removeChild(node) {
            var childNodes = this.childNodes;

            if (!(node instanceof Node)) throw Error('"node" is not an instance of Node.');
            // if 'node' is not a child of this node.
            if (!childNodes.includes(node)) throw Error('The node to be removed is not a child of this node.');

            {   let index = childNodes.indexOf(node);
                childNodes.splice(index, 1);
                node[parent] = null;
            }
        }


        /**
         * 
         * @return {[Node]}
         */
        get [ancestors]() {
            var ancestors = [],
                ancestor = this.parentNode;

            while (ancestor) {
                ancestors.push(ancestor);
                ancestor = ancestor.parentNode;
            }

            return ancestors;
        }
    }

    return Node;
})();

global.Node = Node;

// Note: childNodes should not be an instance of Array