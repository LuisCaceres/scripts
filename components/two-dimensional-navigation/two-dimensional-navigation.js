/* Two dimensional navigation allows the user to move focus between cells in a grid. 
A grid is an interactive control which contains cells of tabular data arranged in 
rows and columns, like a table. The following piece of code implements two dimensional 
navigation for a grid. */

(function () {
    'use strict';

    document.addEventListener('focus', function gridcellDetector(event) {
        var target = event.target;

        if (target.matches('[role=gridcell]')) {
            // assumes 'target' is a cell that belongs to a grid. The application will react
            // to key presses while the cell remains with focus.
            target.addEventListener('blur', blurHandler);
            target.addEventListener('keydown', keydownHandler);
        }
    }, true);


    const END = 35;
    const HOME = 36;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;


    var blurHandler = function blurHandler(event) {
        this.removeEventListener('blur', blurHandler);
        this.removeEventListener('keydown', keydownHandler);
        event.stopPropagation();
    };


    // attempts to find an adjacent cell (if any) relative to the active cell
    var keydownHandler = function keydownHandler(event) {
        var activeCell = event.target;

        var keyPressed = event.keyCode,
            keys = [END, HOME, LEFT, UP, RIGHT, DOWN];

        if (keys.includes(keyPressed) === false) {
            return;
        }

        let cells = new Iterator(activeCell.parentElement.querySelectorAll('[role=gridcell]')),
            cell;

        if (keyPressed === END) {
            cell = cells.last();
        }

        else if (keyPressed === HOME) {
            cell = cells.first();
        }

        else {
            cells.find(activeCell);
            let method = keyPressed === LEFT || keyPressed === UP ? 'previous' : 'next';
            cell = cells[method]();

            activeCell = Rectangle.from(activeCell);

            // Iterates over the cells (in the direction specified by the arrow key pressed)
            while (cell) {
                cell = Rectangle.from(cell);
                let location = cell.locationFrom(activeCell);

                if ((location === 2 && keyPressed === UP) ||
                    (location === 8 && keyPressed === DOWN) ||
                    (location === 4 && keyPressed === LEFT) ||
                    (location === 6 && keyPressed === RIGHT)) {
                    cell = cells.current();
                    activeCell = event.activeCell;
                    break;
                }

                // Tries with another cell until an adjacent cell is found or there are no more cells.
                cell = cells[method]();
            }

            if (!cell) {
                // Realizes there's no more cells in the direction specified by the arrow key pressed.
                // This is because the active cell is one of the outermost ones in the grid.
                console.log('No more cells in this direction! User may need to be alerted');
                cell = event.activeCell;
            }
            else {
                // realizes an adjacent cell has been found. It will gain focus soon.
                setTimeout(function () {
                    // swaps the values of the 'tabindex' attribute. A composite widget can 
                    // contain only one element with a 'tabindex' value of 0.
                    event.target.tabIndex = -1;
                    cell.tabIndex = 0;
                    cell.focus();
                }, 0);
            }
        }

        event.preventDefault();
        event.stopPropagation();
    };
})();