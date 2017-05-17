/* A composite widget (such as a grid) may contain activable descendants. To move through the activable descendants the user may press the HOME, END, or arrow keys. This is referred to as directional navigation. The following piece of code enables directional navigation for a composite widget. */

(function () {
    'use strict';

    // Relevant string values returned by `KeyboardEvent.prototype.key`.
    const KEYS_ALLOWED = [
        ['End'],
        ['Home'],
        // 'Left' and 'Up' is returned on IE 11 and Edge.
        ['ArrowLeft', 'Left', 'ArrowUp', 'Up'],
        // 'Right' and 'Down' is returned on IE 11 and Edge.
        ['ArrowRight', 'Right', 'ArrowDown', 'Down']
    ];

    // Relevant ARIA roles related to a composite widget.
    const SELECTOR = '[role=gridcell], [role=tab]';
    
    
    /* Removes any event listeners.
     * @this {Element} - The composite widget.
     * @listens FocusEvent#type === 'blur'
     */
    function blurHandler() {
        this.removeEventListener('blur', blurHandler);
        this.removeEventListener('keydown', keydownHandler);
    }


    /* Attempts to detect the existence of a composite widget.
     * @this {Element} - The composite widget.
     * @listens FocusEvent#type === 'focus'
     */
    function compositeWidgetDetector() {
        var activeElement = document.activeElement;

        if (isPartOfCompositeWidget(activeElement)) {
            // The widget reacts to some key presses while it has focus.
            activeElement.addEventListener('blur', blurHandler);
            activeElement.addEventListener('keydown', keydownHandler);
        }
    }


    /* Taking into account the key pressed, returns a constant signaling the
     * location of the active descendant amongst its siblings.
     * @param {String} key - The key pressed by the user.
     * @return {Number} A constant with the following values:
     */
    const LAST = 0,
        FIRST = 1,
        PREVIOUS = 2,
        NEXT = 3,
        NONE = 4;
    
    function getDestinationBasedOn(key) {
        for (var i = 0; i < KEYS_ALLOWED.length; i++) {
            if (KEYS_ALLOWED[i].includes(key)) {
                break;
            }
        }
        return i;
    }

    
    /* Tests whether an element belongs to a composite widget.
     * @param {Element} element - The element to test.
     * @return {Boolean} The result of the test.
     */
    function isPartOfCompositeWidget(element) {
        return element.matches(SELECTOR);
    }

    
    /* Selects another active descendant according to the key pressed.
     * @this {Element} - The active descendant.
     * @listens KeyboardEvent#type === 'keydown'
     */
    function keydownHandler(event) {
        // Finds out which active descendant the user wishes to select.
        var destination = getDestinationBasedOn(event.key);

        // As long as there is a destination.
        if (destination !== NONE) {
            // Constructs a list of active descendants.
            let siblings = Array.from(this.parentElement.children)
                .filter(isPartOfCompositeWidget);

            // Constructs an autoresettable iterator positioned at the target of
            // this event.
            siblings = new Iterator(siblings);
            siblings.autoreset = true;
            siblings.positionAt(this);

            // Selects an active descendant according to the destination.
            switch (destination) {
                case LAST:
                    siblings.last();
                    break;
                case FIRST:
                    siblings.first();
                    break;
                case PREVIOUS:
                    siblings.previous();
                    break;
                case NEXT:
                    siblings.next();
                    break;
            }

            // Ensures the parent widget has only 1 active descendant with a
            // tabindex value of 0.
            this.tabIndex = -1;
            siblings.current().tabIndex = 0;
            siblings.current().focus();

            // Prevents scrolling when pressing arrow keys.
            event.preventDefault();
        }
    };
    
    document.addEventListener('focus', compositeWidgetDetector, true);
}());