/* Sometimes it is useful to maintain a list of files uploaded to the browser
by a single <input type="file">. However, leaving this up to the browser is not
ideal. For example, there is no way to remove only one file from the list after
multiple files have been selected. Moreover, selecting another file clears the
list entirely. The following piece of code addresses the aforementioned
issues.*/

(function () {
    'use strict';

    // Create an empty map of file select controls as keys and lists of files as values.
    const fileSelects = new Map();

    // Specify a CSS selector to accurately identify a file select control.
    const SELECTOR = 'input[type=file]';


    /**
     * Maintain a list of files selected by a file select control.
     * @param {Event} event
     * @listens Event#change
     */
    function maintainListOfFiles(event) {
        // Get a reference to the target of the event.
        const target = event.target;

        // If the target of the event is a file select control.
        if (target.matches(SELECTOR)) {
            // Refer to the target as a file select control from here on.
            const fileSelect = target;
            // If the control does not map to a list of files.
            if (!fileSelects.has(fileSelect)) {
                // Initialize an empty list of files.
                const list = [];
                // Specify the size of the list as zero bits.
                list.size = 0;
                // Map the file select control to the list.
                fileSelects.set(fileSelect, list);
            }

            // Get the list of files mapped to the file select control.
            const list = fileSelects.get(fileSelect);

            Array.from(fileSelect.files)
                // For each file currently selected by the file select control.
                .forEach(function (file) {
                    // If the file is not present in the list of files.
                    if (!list.some(isDuplicate(file, 'name'))) {
                        // Invoke the onWillAddFile function.
                        let RESPONSE = onWillAddFile(file, list, fileSelect);

                        // If the file is allowed to be included in the list.
                        if (RESPONSE) {
                            // Add the file to the list of files.
                            list.push(file);
                            // Calculate the size of the list.
                            list.size += file.size;
                            // Invoke the onDidAddFile function.
                            onDidAddFile(file, list, fileSelect);
                        }
                    }
                });
        }
    }


    /** Check if a file already exists the list of files mapped to a file
     * select control.
     * @param {File} fileA
     * @param {String} key -
     * @returns {Function} -
     */
    function isDuplicate(fileA, key) {
        return function (fileB) {
            // Check if a file in the list has the same name as the file intended for inclusion.
            return fileA[key] === fileB[key];
        }
    }


    /** Check if the file provided will be added to the list of files.
     * @param {File} file - The file provided.
     * @param {[File]} list - The list of files the file may be added to.
     * @param {HTMLInputElement} fileSelect - The file select control that
     * holds the file.
     * @returns {Boolean} - Whether the file will be added to the list.
     */
    function onWillAddFile(file, list, fileSelect) {}


    /** Perform an action after a file has been added to the list of files.
     * @param {File} file - The file that has just been added.
     * @param {[File]} list - The list of files the file has just been added to.
     * @param {HTMLInputElement} fileSelect - The file select control that
     * holds the file.
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

    // Maintain an internal list of files selected by a file select control.
    window.addEventListener('change', maintainListOfFiles, true);
    // Perform an action after a file has been removed from the list of files.
    window.addEventListener('remove', onDidRemoveFile, true);
}());