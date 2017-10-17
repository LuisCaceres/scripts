/* The following piece of code is in charge of building a widget that offers a list of choices to the user, such as a set of actions or functions. This is known as a menu. A menu consists of one or more menu items. A menu may be complex in that it may include sub-level menus which in turn own one or more menu items. */

var ventana = ventana || {};

(function () {
    'use strict';

    const menuItems = new Map();

    /** Creates a menu and appends menu items to it. Recursion is implemented
     * if a sub-level menu is associated with one of those menu items.
     * @param {{}} labels - The labels of the menu items that will be appended
     * to 'menu'.
     * @return {Menu} menu - The menu that has just been created.
     */
    function createMenu(labels) {
        // Let 'menu' be a menu.
        const menu = new Menu();

        // For each label in 'labels'.
        for (let label in labels) {
            // Let 'label' be the current label.
            // Let 'menuItem' be a menu item whose label is 'label'.
            const menuItem = new MenuItem(label);
            // Append 'menuItem' to 'menu'.
            menu.appendChild(menuItem);
            menu.view.append(menuItem.view);
            menuItems.set(menuItem.view, menuItem);

            // If 'menuItem' may be used to launch a sub-level menu.
            if (labels[label] !== null) {
                // Let 'sublevelMenu' be that sub-level menu.
                // Let 'menuItems' be the menu items owned by 'sublevelMenu'.
                const menuItems = labels[label];
                // Recursively run the previous steps to append 'menuItems' to 'sublevelMenu'.
                const sublevelMenu = createMenu(menuItems);
                // Append 'sublevelMenu' to ' menu'.
                menuItem.appendChild(sublevelMenu);
                menu.view.append(sublevelMenu.view);
                // Update the status of 'menuItem' to assistive technologies.
                menuItem.view.setAttribute('aria-expanded', false);
                menuItem.view.setAttribute('aria-haspopup', true);
            }         
        }    

        return menu;
    }


    class Menu extends ventana.Node {
        /**
         * Creates a menu.
         * @returns {Menu}
         */
        constructor() {
            super();
            // Let 'view' be the view of the menu.
            const view = this.view = document.createElement('div');
            // Allow 'view' to be assistive technology accessible.
            view.setAttribute('role', 'menu');
        }    
    }


    class MenuItem extends ventana.Node {
        /**
         * Creates a menu item.
         * @param {String} label - The text content of this menu item.
         * @returns {MenuItems}
         */
        constructor(label) {
            super();
            this.label = label;
            // Let 'view' be the view of the menu item.
            const view = this.view = document.createElement('div');
            // Allow 'view' to be assistive technology accessible.
            view.setAttribute('role', 'menuitem');
            // Allow 'view' to be keyboard accessible.
            view.tabIndex = 0;
            // Provide 'view' with an accessible name as required by ARIA.
            view.textContent = label;
        }
    }    

    ventana.createMenu = createMenu;
}());