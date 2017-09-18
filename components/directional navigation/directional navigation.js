/* A composite widget (such as a grid) may contain activable descendants. To
move through the activable descendants the user may press the HOME, END, or
arrow keys. This is referred to as directional navigation. The following piece
of code enables directional navigation for a composite widget. */

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
    const SELECTOR = '[role=gridcell], [role=menuitem], [role=tab]';
    
    
    /* Removes any event listeners.
     * @this {Element} - The active descendant.
     * @listens FocusEvent#type === 'blur'
     */
    function blurHandler() {
        this.removeEventListener('blur', blurHandler);
        this.removeEventListener('keydown', keydownHandler);
    }


    /* Attempts to detect the existence of a composite widget.
     * @this {Element} - Any element that may receive focus.
     * @listens FocusEvent#type === 'focus'
     */
    function compositeWidgetDetector() {
        const ACTIVE_ELEMENT = document.activeElement;

        if (isPartOfCompositeWidget(ACTIVE_ELEMENT)) {
            // The widget reacts to some key presses while it has focus.
            ACTIVE_ELEMENT.addEventListener('blur', blurHandler);
            ACTIVE_ELEMENT.addEventListener('keydown', keydownHandler);
        }
    }


    /* Taking into account the key pressed, returns a constant indicating the
     * position of the active descendant the user wishes to select.
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
        const DESTINATION = getDestinationBasedOn(event.key);

        // As long as there is a destination.
        if (DESTINATION !== NONE) {
            // Constructs a list of active descendants.
            let siblings = Array.from(this.parentElement.children)
                .filter(isPartOfCompositeWidget);

            // Constructs an autoresettable iterator positioned at the target of
            // this event.
            siblings = new Iterator(siblings);
            siblings.autoreset = true;
            siblings.positionAt(this);

            // Selects an active descendant according to the destination.
            switch (DESTINATION) {
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

            siblings.current().focus();

            // Prevents scrolling when pressing arrow keys.
            event.preventDefault();
        }
    };
    
    document.addEventListener('focusin', compositeWidgetDetector, true);
}());