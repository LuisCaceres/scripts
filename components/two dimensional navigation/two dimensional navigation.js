if (typeof window === 'undefined') require('./../Browsing Context/browsing context.js');


/* Two dimensional navigation allows the user to move focus between cells in a grid. 
A grid is an interactive control which contains cells of tabular data arranged in 
rows and columns, like a table. The following piece of code implements two dimensional 
navigation for a grid. */

(function () {
    'use strict';

    document.addEventListener('focus', function gridcellDetector(event) {
        var target = event.target;

        if (target.matches('[role=gridcell]')) {
            target.addEventListener('blur', blurHandler);
            target.addEventListener('keydown', keydownHandler);
        }
    }, true);


    var blurHandler = function blurHandler(event) {
        this.removeEventListener('blur', blurHandler);
        this.removeEventListener('keydown', keydownHandler);
    };

    
    // Invokes handler when a cell has focus and a keyboard key is pressed.
    var keydownHandler = function keydownHandler(event) {
        var key = event.key,
            activeCell = event.target;

        if (key.includes('Arrow') === false) {
            // Not an arrow key. Keypress event is irrelevant. Aborts.
            return; 
        }
        
        // For example, 'ArrowUp' becomes 'UP'.
        key = key.replace('Arrow', '').toUpperCase();

        // Retrieves a reference to each cell in the grid.
        let cells = new Iterator(activeCell.parentElement.querySelectorAll('[role=gridcell]')),
            cell;

        // Positions the iterator at the position occupied by the cell with focus.
        cells.positionAt(activeCell);
        
        let method = key === 'LEFT' || key === 'UP' ? 'previous' : 'next';
        cell = cells[method]();

        activeCell = Rectangle.from(activeCell);

        // Iterates over the cells (in the direction specified by the arrow key pressed).
        while (cell) {
            cell = Rectangle.from(cell);
            let location = cell.locationFrom(activeCell);

            if ((location === 2 && key === 'UP') ||
                (location === 8 && key === 'DOWN') ||
                (location === 4 && key === 'LEFT') ||
                (location === 6 && key === 'RIGHT')) {
                // Finds an adjacent cell.
                cell = cells.current();
                activeCell = event.activeCell;
                break;
            }

            // Tries with another cell until an adjacent cell is found or there are no more cells.
            cell = cells[method]();
        }

        if (!cell) {
            // Realizes there's no more cells in the direction specified by the key pressed.
            console.log('No more cells in this direction! User may need to be alerted');
            cell = event.activeCell;
        }
        else {
            // Realizes an adjacent cell exists. It will gain focus soon.
            setTimeout(function () {
                // swaps the values of the 'tabindex' attribute. A composite widget can 
                // contain only one element with a 'tabindex' value of 0.
                event.target.tabIndex = -1;
                cell.tabIndex = 0;
                cell.focus();
            }, 0);
        }

        event.preventDefault();
    };
})();