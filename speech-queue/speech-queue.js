/* Assistive technology and browser support for the Accessible Internet Rich Applications 
(ARIA) support is still limited. */

var label = (function () {
    'use strict';

    // accessible name
    var label = document.createElement('div');
    label.id = 'label';
    // label.hidden = true;

    document.body.append(label);

    // stores a couple of strings representing the two most recent type of events. Currently, the program 
    // is only interested in focus and remove events.
    var events = new FixedQueue(2);

    
    document.addEventListener('focus', function (event) {
        var target = event.target;

        var string = target.textContent + ' selected. ';

        if (target) {
            string += 'To navigate through the list press the arrow keys. ';
        }
         
        if (target) {
            string += 'To remove from the list press...';
        }

        // A focus event preceded by another focus event does not convey any extra information about 
        // the state of the application. However, if the preceding event is of any other type it is 
        // extremely likely that the state of the application has changed in such a way that it may 
        // be of interest to the user.
        if (events.data[0] !== 'focus') {
            string = label.textContent + string;
        }  
            
        label.textContent = string;
        events.enqueue(event.type);
    
    }, true);


    document.addEventListener('remove', function (event) {
        var string = event.target.textContent + ' removed. ';

        if (event.target.parentElement.children.length === 1) {
            string += 'There are no more items. ';
        }

        label.textContent = string;
        events.enqueue(event.type);
    });

    return label;
})();