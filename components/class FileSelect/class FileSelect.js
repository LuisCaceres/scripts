/* Sometimes it is useful to maintain a list of files uploaded to the browser
by a single <input type="file">. However, leaving this up to the browser is not
ideal. For example, there is no way to remove only one file from the list after
multiple files have been selected. Moreover, selecting another file clears the
list entirely. The following piece of code addresses the aforementioned
issues.*/

(function () {
    'use strict';

    /** @type {Map<HTMLInputElement, Map<HTMLElement,File>} */
    // Let 'controls' be a list of links between a file select control and a list of files.
    const controls = new Map();


    /** Create and update a list of files associated with a file select control.
     * @param {Event} event
     * @listens Event#change
     */
    function onChange(event) {
        // Let 'target' be the target of the event.
        const target = event.target;

        // If 'target' is a file select control.
        if (target.nodeName === 'INPUT' && target.type === 'file') {
            // Let 'control' be 'target'.
            const control = target;
            // If 'control' is not associated with a list of files.
            if (!controls.has(control)) {
                // Let 'list' be an empty list of files.
                const list = new Map();
                // Specify the size of 'list' as zero bits.
                list.totalSize = 0;
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
                    if (!isDuplicate(file.name, list)) {
                        // Fire an onWillAddFile event.
                        let RESPONSE = onWillAddFile(file, list, control);

                        // If the event returns a truthy value.
                        if (RESPONSE) {
                            // Let 'attachment' be a representation of 'file' in HTML.
                            const attachment = createAttachment(file);
                            // Associate 'attachment' with 'file'.
                            // Add 'attachment' and 'file' to 'list'.
                            list.set(attachment, file);
                            // (Re)calculate the size of 'list'.
                            list.totalSize += file.size;
                        }
                    }
                });
        }
    }


    /** Check if a file already exists in a list of files associated with a
     * file select control.
     * @param {String} name - The name of a file.
     * @param {Map<HTMLElement, File>} list - A list of files associated with a
     * file select control.
     * @returns {Boolean} - Whether a file in 'list' has the same name as
     * 'name'.
     */
    function isDuplicate(name, list) {
        /** @type {[String]} */
        // Let 'names' be an empty list of file names.
        const names = [];
        // For each file in 'list'.
        list.forEach(function (file) {
            // Let 'file' be the current file.
            // Add the name of 'file' to 'names'.
            names.push(file.name);
        });
        // Check if 'name' is present in 'names'.
        return names.includes(name);
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
    function createAttachment(file) {
        let row = document.querySelector('[role=row]');
        let cell = document.createElement('div');
        cell.setAttribute('role', 'gridcell');
        cell.classList.add('attachment');
        cell.textContent = file.name;
        row.append(cell);
        return cell;
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