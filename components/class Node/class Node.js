var ventana = ventana || {};

ventana.Node = (function () {
    'use strict';

    var ancestors = Symbol('ancestors'),
        parent = Symbol('parent');

    class Node {
        constructor() {
            /** @type {[Node]} */
            this.childNodes = [];
            this[parent] = null;
        }


        /** Add a node to the end of the list of children of this node. 
         * @param {Node} The node to add.
         * @return {Node} The node that has just been added.
         */
        appendChild(node) {
            // Throw an error if 'node' is not an instance of Node.
            if (!(node instanceof Node)) {
                throw Error('"node" is not an instance of Node.');
            }

            // Throw an error if this node attempts to append itself.
            if (this === node) {
                throw Error('This node cannot append itself as a child.');
            }

            // Throw an error if 'node' is an ancestor of this node.
            if (this[ancestors].includes(node)) {
                throw Error('The node to be appended contains this node.');
            }

            // If 'node' has a parent.
            if (node.parentNode) {
                // Let 'parent' be the parent of 'node'.
                const parent = node.parentNode;
                // Remove 'node' from the children of 'parent'.
                parent.removeChild(node);
            }

            // Add 'node' to the children of this node.
            this.childNodes.push(node);
            // Set this node as the new parent of 'node'.
            node[parent] = this;
            // Return 'node'.
            return node;
        }


        /** Return the first child of this node. If there is no such
         * node, this returns null.
         * @return {Node|null}
         */
        get firstChild() {
            return this.childNodes[0] || null;
        }


        /** Return the last child of this node. If there is no such
         * node, this returns null.
         * @return {Node|null}
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
            // Let 'parent' be the parent node of this node (if there is one).
            const parent = this.parentNode;

            // If this node has no parent, abort these steps and return null.
            if (!parent) {
                return null;
            }

            // Otherwise, let 'children' be the child nodes of 'parent'.
            const children = parent.childNodes;
            // Let 'INDEX' be the position of this node amongst 'children'.
            const INDEX = children.indexOf(this);
            // Let 'sibling' be the sibling of this node positioned immediately after 'INDEX'.
            const sibling = children[INDEX + 1];
            // Return 'sibling' if there is one, otherwise null.
            return sibling || null;
        }


        /** Return the node immediately preceding this node. If there is no such
         * node, this returns null.
         * @return {Node|null}
         */
        get previousSibling() {
            // Let 'parent' be the parent node of this node (if there is one).
            const parent = this.parentNode;

            // If this node has no parent, abort these steps and return null.
            if (!parent) {
                return null;
            }

            // Otherwise, let 'children' be the child nodes of 'parent'.
            const children = parent.childNodes;
            // Let 'INDEX' be the position of this node amongst 'children'.
            const INDEX = children.indexOf(this);
            // Let 'sibling' be the sibling of this node positioned immediately before 'INDEX'.
            const sibling = children[INDEX - 1];
            // Return 'sibling' if there is one, otherwise null.
            return sibling || null;
        }


        /** Return the parent of this node. If there is no such
         * node, this returns null.
         * @return {Node|null}
         */
        get parentNode() {
            return this[parent];
        }


        /** Remove this node from the list of children of its parent.
         */
        remove() {
            this.parentNode.removeChild(this);
        }


        /** Remove a child node from the list of children of this node.
         * @param {Node} The child node to be removed.
         * @return {Node} The child node that has just been removed.
         */
        removeChild(node) {
            // Let 'children' be the children of this node if any.
            const children = this.childNodes;

            // Throw an error if 'node' is not an instance of Node.
            if (!(node instanceof Node)) {
                throw Error('"node" is not an instance of Node.');
            }

            // Throw an error if 'node' is not found in 'children'.
            if (!children.includes(node)) {
                throw Error('The node to be removed is not a child of this node.');
            }

            // Let 'INDEX' be the indexed position of 'node' amongst 'children'.
            let INDEX = children.indexOf(node);
            // Remove the node found at 'INDEX' in 'children'.
            children.splice(INDEX, 1);
            // Mark 'node' as having no parent.
            node[parent] = null;
            // Return 'node'.
            return node;
        }


        /**
         * @private
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
}());

// Note: childNodes should not be an instance of Array