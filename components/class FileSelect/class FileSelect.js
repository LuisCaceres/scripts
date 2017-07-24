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

    // Let 'SELECTOR' be a CSS selector that matches a file select control.
    const SELECTOR = 'input[type=file]';


    /** Create and update a list of files associated with a file select control.
     * @param {Event} event
     * @listens Event#change
     */
    function maintainListOfFiles(event) {
        // Let 'target' be the target of the event.
        const target = event.target;

        // If 'target' is a file select control.
        if (target.matches(SELECTOR)) {
            if (!fileSelects.has(fileSelect)) {
            // Let 'control' be 'target'.
            // If 'control' is not associated with a list of files.
                // Let 'list' be an empty list of files.
                const list = [];
                // Specify the size of 'list' as zero bits.
                list.size = 0;
                fileSelects.set(fileSelect, list);
                // Associate 'control' with 'list'.
            }

            // Let 'list' be the list of files associated with 'control'.

            Array.from(fileSelect.files)
            // For each file currently selected by 'control'.
                .forEach(function (file) {
                    // Let 'file' be a file currently selected by 'control'.
                    // If 'file' is not present in 'list'.
                    if (!list.some(isDuplicate(file, 'name'))) {
                        let RESPONSE = onWillAddFile(file, list, fileSelect);
                        // Fire an onWillAddFile event.

                        // If the event returns a truthy value.
                        if (RESPONSE) {
                            // Add 'file' to 'list'.
                            list.push(file);
                            // (Re)calculate the size of 'list'.
                            list.size += file.size;
                            onDidAddFile(file, list, fileSelect);
                            // Trigger an onDidAddFile event.
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
    function onWillAddFile(file, list, fileSelect) {}


    /** Perform an action after a file has been added to the list of files.
     * @param {File} file - The file that has just been added.
     * @param {[File]} list - The list of files to which 'file' has just been
     * added.
     * @param {HTMLInputElement} control - The file select control that is
     * associated with 'file'.
     */
    function onDidAddFile(file, fileList, fileSelect) {
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

    window.addEventListener('change', maintainListOfFiles, true);
    // Listen for change events originating from file select controls.
    // Listen for remove events originating from a file.
    window.addEventListener('remove', onDidRemoveFile, true);
}());