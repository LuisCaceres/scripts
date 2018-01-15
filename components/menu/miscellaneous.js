/* The following piece of code creates the most basic representation of a
menubar. The input is an object that represents the menubar as a tree data structure. The output is HTML markup.

Instructions:

1. Copy the following piece of code.
2. Use the console panel by Chrome Developer Tools.
3. Paste the following piece of code into the console.
4. Initialize a `data` variable.
5. Create an object that represents the menubar as a tree data structure. For
   example:

    {
        'item-a': {    // menu item
            'item-aa': null,    // menu items in a submenu
            'item-ab': null, 
            'item-ac': null
        },
        'item-b': null,     // some other menu items
        'item-c': null,
        'item-d': null,
    }

6. Assign that object to the `data` variable.
7. Call the `Menu` function passing `data` as the sole argument.
8. Assign the result of calling `Menu` to a `menubar` variable. `menubar`
   now contains HTML markup which is the least complex representation of the
   menubar.
9. Modify the HTML markup to customise the menubar as required.

Use the modified HTML markup for your projects. Do not use the following code in production. */




/** Create a menu and appends menu items to it. Recursion is implemented
 * if a submenu is associated with one of those menu items.
 * @param {{}} labels - The labels of the menu items that will be appended
 * to 'menu'.
 * @return {HTMLDivElement} menu - The menu that has just been created.
 */
const Menu = (function() {
    'use strict';

    // Let `counter` be a digit that uniquely identifies a menu.
    var counter = 0;

    return function Menu(labels) {
        // Let 'menu' be a menu.
        const menu = document.createElement('div');
        // Let 'role' be the WAI-ARIA role assigned to 'menu'. Only the topmost element may have the role of 'menubar' Any subsequent elements may have the role of 'menu' or 'menu-item'.
        const ROLE = counter === 0 ? 'menubar' : 'menu';
        menu.classList.add(ROLE);
        menu.dataset.label = counter++;
        menu.setAttribute('role', ROLE);

        // For each label in 'labels'.
        for (const label in labels) {
            // Let 'label' be the current label.
            // Let 'menuItem' be a menu item whose label is 'label'.
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.dataset.label = label;
            menuItem.setAttribute('role', 'menuitem');
            menuItem.tabIndex = 0;
            menuItem.textContent = label;
            // Append 'menuItem' to 'menu'.
            menu.append(menuItem);

            // If 'menuItem' may be used to launch a submenu.
            if (labels[label] !== null) {
                // Let 'submenu' be that submenu.
                // Let 'menuItems' be the menu items owned by 'submenu'.
                const menuItems = labels[label];
                // Recursively run the previous steps to append 'menuItems' to 'submenu'.
                const submenu = Menu(menuItems);
                submenu.setAttribute('aria-expanded', false);

                // Append 'submenu' to ' menu'.
                menu.append(submenu);
                menuItem.setAttribute('aria-haspopup', true);
            }
        }

        return menu;
    }
}());