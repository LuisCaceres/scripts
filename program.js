dialog.alert('Welcome!');


// displays a box at the top of the viewport when a tab is pressed for 1 second
document.addEventListener('persistentpress', (function () {
    var menu = document.querySelector('#menu');
    menu.remove();

    return function (event) {
        var target = event.target;

        if (target.matches('.tab') &&
            target.getAttribute('aria-expanded') === 'false') {
            document.body.append(menu);
        }
    };
})());




// checks if the user really wishes to remove a destination from the list
document.addEventListener('remove', function (event) {
    let target = event.target;

    if (target.matches('.tab')) {
        // freezes the removal operation
        event.preventDefault();

        let tab = target;
        if (tab.closest('.tab-list').querySelectorAll('.tab').length > 1) {
            // awaits for user confirmation
            dialog.confirm('Are you sure you want to delete this destination?')
            dialog.onfulfilled = function () {    
                // removes the tabpanel
                target.nextElementSibling.remove();
                // removes the tab
                target.remove();
            };
        }
        else {         
            // rejects removal since at least one destination must be present
            dialog.alert('', 'You cannot delete all your destinations!');
        }
    }
});