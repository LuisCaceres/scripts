/* Sometimes it is useful to maintain a list of files uploaded to the browser
by a single <input type="file">. However, leaving this up to the browser is not
ideal. For example, there is no way to remove only one file from the list after
multiple files have been selected. Moreover, selecting another file clears the
list entirely. The following piece of code addresses the aforementioned
issues.*/

const FileSelectControl = (function () {
    'use strict';

    /** @type {Map<HTMLInputElement, FileSelectControl>} */
    // Let 'instances' be a map of file select controls to instances of FileSelectControl.
    const instances = new Map();

    /** @type {Map<File, HTMLInputElement} */
    // Let 'controls' be a map of file objects and file select controls.
    const controls = new Map();

    /** @type {Map<HTMLElement, File>} */
    // Let 'views' be a map of file objects rendered in HTML and file objects.
    const views = new Map();


    /** Create and update a list of files associated with a file select control.
     * @param {Event} event
     * @listens Event#change
     */
    function onChange(event) {
        // Let 'target' be the target of the event.
        const target = event.target;

        // If 'target' is a file select control.
        if (target.nodeName === 'INPUT' && target.type === 'file') {
            /** @type {HTMLInputElement} */
            // Let 'control' be 'target'.
            const control = target;

            // If an instance of FileSelectControl does not map to 'control'.
            if (!instances.has(control)) {
                // Construct an instance of FileSelectControl that maps to 'control'.
                new FileSelectControl(control);
            }

            // Let 'instance' be the instance of FileSelectControl that maps to 'control'.
            const instance = instances.get(control);
            // Let 'files' be a list of file object associated with 'control'.
            const files = control.files;
            // Select each file object in 'files'.
            instance.select(files);
        }
    }


    /** Check if a file already exists in the list of files associated with a
     * file select control.
     * @param {String} name - The name of a file.
     * @param {Set<File>} list - A list of files associated with a
     * file select control.
     * @return {Boolean} - Whether a file in 'list' has the same name as
     * 'name'.
     */
    function isDuplicate(name, list) {
        /** @type {String[]} */
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


    /** Remove a file object from a list of file objects.
     * @param {Event} event
     * @listens Event.type === 'remove'
     */
    function onRemove(event) {
        /** @type {Element} */
        // Let 'target' be the element to remove.
        const target = event.target;

        // If 'target' is a file object rendered in HTML.
        if (target.classList.contains('')) {
            // Let 'view' be 'target'.
            const view = target;
            // Let 'file' be the file object associated with 'view'.
            const file = views.get(view);
            // Let 'control' be the file select control associated with 'file'.
            const control = controls.get(file);
            // Let 'list' be the list of file objects associated with 'control'.
            const list = instances.get(control).files;

            // Remove 'file' from 'list'.
            list.delete(file);
            // Remove 'view' and disassociate it from 'file'.
            views.delete(view);
            // Remove 'file' and disassociate it from 'control'.
            controls.delete(file);
            // Reset 'control';
            control.value = '';
        }
    }


    /** Represents a file select control.
     * @param {HTMLInputElement} control - An input element whose type
     * attribute has a value of file.
     * @return {FileSelectControl}
     */
    function FileSelectControl(control) {
        this.control = control;

        /** @type {Set<File>} */
        // Let 'list' be an empty list of file objects.
        this.files = new Set();
        // Specify the size of 'list' as zero bits.
        this.files.totalSize = 0;
        // Associate 'control' with this instance.
        instances.set(control, this);
    }


    const prototype = FileSelectControl.prototype;


    /** Mark each file object in a list as selected.
     * @param {File[]} files - A list of file objects.
     */
    prototype.select = function (files) {
        // Let 'list' be a list of file objects.
        const list = this.files;

        // For each file object in 'files'.
        for (let i = 0; i < files.length; i++) {
            // Let 'file' be the current file object.
            const file = files[i];
            // If 'file' is not present in 'list'.
            if (!isDuplicate(file.name, list)) {
                // Let 'BOOLEAN' be the result of verifing whether 'file' may be selected by the user.
                let BOOLEAN = this.onBeforeSelect(file);

                // If 'BOOLEAN' signals 'file' may be selected by the user.
                if (BOOLEAN) {
                    // Let 'view' be 'file' as rendered in HTML.
                    const view = this.onSelect(file);
                    // Associate 'view' with 'file'.
                    views.set(view, file);
                    // Associate 'file' with 'control'.
                    controls.set(file, this.control);
                    // Add 'file' to 'list'.
                    list.add(file);
                    // (Re)calculate the size of 'list'.
                    list.totalSize += file.size;
                }
            }
        }
    };


    /** Verify whether a file may be selected by the user. In other words,
     * it checks if the file meets a certain criteria. If the file meets the
     * criteria the file may be seleced by the user. For example, if the file
     * exceeds a specified size limit the file may not be selected by the user.
     * @param {File} file - A file.
     * @return {Boolean} - Whether 'file' may selected by the user.
     */
    prototype.onBeforeSelect = function onBeforeSelect(file) {
        return true;
    };


    /** Create a representation of a file object in HTML.
     * @param {File} file - A file object.
     * @return {Element} - The file object as rendered in HTML.
     */
    prototype.onSelect = function onSelect(file) { };


    // Listen for change events fired at file select controls.
    window.addEventListener('change', onChange, true);
    // Listen for remove events fired at file objects as rendered in HTML.
    window.addEventListener('remove', onRemove, true);


    return FileSelectControl;
}());