(function(){
    'use strict';

    // Gives each box a different background color.
    var r = 0, 
        g = 0;

    var boxes = document.querySelectorAll('figure');
    boxes = new Iterator(boxes);

    var box = boxes.next();
    while (box) {
        r += 5;
        g += 5;
        // ES6 +++++ box.style.backgroundColor = `rgb(${r}, ${g}, 0)`;
        box.style.backgroundColor = 'rgb(' + r + ',' + g +',0)';
        box = boxes.next();
    }

    dialog.confirm('Two-Dimensional Navigation', '\n\nTwo dimensional navigation allows the user to move focus between cells in a grid. A grid is an interactive control which contains cells of tabular data arranged in rows and columns, like a table.\n\nThe following piece of code implements two dimensional navigation for a grid. This implementation is completely unaware of the dimensions of the grid. As the size of the viewport (and that of the grid itself) changes the user is still able to navigate through the cells intuitively.\n\n');
})();