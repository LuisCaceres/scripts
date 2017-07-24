/* Sometimes it is useful to maintain a list of files uploaded to the browser
by a single <input type="file">. However, leaving this up to the browser is not
ideal. For example, there is no way to remove only one file from the list after
multiple files have been selected. Moreover, selecting another file clears the
list entirely. The following piece of code addresses the aforementioned
issues.*/

(function () {
    'use strict';

    /** @type {Map<HTMLInputElement, [File]>} */
    // Let 'controls' be an empty map of file select controls and lists of files.
    const controls = new Map();

    // Let 'SELECTOR' be a CSS selector that matches a file select control.
    const SELECTOR = 'input[type=file]';


    /** Create and update a list of files associated with a file select control.
     * @param {Event} event
     * @listens Event#change
     */
    function onChange(event) {
        // Let 'target' be the target of the event.
        const target = event.target;

        // If 'target' is a file select control.
        if (target.matches(SELECTOR)) {
            // Let 'control' be 'target'.
            const control = target;
            // If 'control' is not associated with a list of files.
            if (!controls.has(control)) {
                // Let 'list' be an empty list of files.
                const list = [];
                // Specify the size of 'list' as zero bits.
                list.size = 0;
                // Associate 'control' with 'list'.
                controls.set(control, list);
            }

            // Let 'list' be the list of files associated with 'control'.
            const list = controls.get(control);

            // For each file currently selected by 'control'.
            Array.from(control.files)
                .forEach(function (file) {
                    // Let 'file' be a file currently selected by 'control'.
                    // If 'file' is not present in 'list'.
                    if (!list.some(isDuplicate(file, 'name'))) {
                        // Fire an onWillAddFile event.
                        let RESPONSE = onWillAddFile(file, list, control);

                        // If the event returns a truthy value.
                        if (RESPONSE) {
                            // Add 'file' to 'list'.
                            list.push(file);
                            // (Re)calculate the size of 'list'.
                            list.size += file.size;
                            // Trigger an onDidAddFile event.
                            onDidAddFile(file, list, control);
                        }
                    }
                });
        }
    }


    /** Check if a file already exists in the list of files associated with a
     * file select control.
     * @param {File} fileA - The file provided.
     * @param {String} key - The name of a property in 'file'.
     * @returns {Function} -  The function to be passed to 
     */
    function isDuplicate(fileA, key) {
        return function (fileB) {
            // Check if the name of 'fileA' is already the name of another file.
            return fileA[key] === fileB[key];
        }
    }


    /** Check if the file provided will be added to the list of files.
     * @param {File} file - The file provided.
     * @param {[File]} list - The list of files 'file' may be added to.
     * @param {HTMLInputElement} control - The file select control that
     * holds 'file'.
     * @returns {Boolean} - Whether 'file' will be added 'list'.
     */
    function onWillAddFile(file, list, control) {
        return true;
    }


    /** Perform an action after a file has been added to the list of files.
     * @param {File} file - The file that has just been added.
     * @param {[File]} list - The list of files to which 'file' has just been
     * added.
     * @param {HTMLInputElement} control - The file select control that is
     * associated with 'file'.
     */
    function onDidAddFile(file, list, control) {
        let row = document.querySelector('[role=row]');
        let cell = document.createElement('div');
        cell.setAttribute('role', 'gridcell');
        cell.classList.add('attachment');
        cell.textContent = file.name;
        row.append(cell);
    }


    /** Perform an action after a file has been removed from the list of files.
     * @param {Event} event
     * @listens Event#remove
     */
    function onDidRemoveFile(event) {}

    // Listen for change events originating from file select controls.
    window.addEventListener('change', onChange, true);
    // Listen for remove events originating from a file.
    window.addEventListener('remove', onDidRemoveFile, true);
}());