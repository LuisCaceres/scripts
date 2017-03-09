var dialog = (function () {
    "use strict";


    var html = '<div id="sibling-stacking-context" aria-hidden="true"></div>' +
               '<div id="dialog" aria-describedby="dialog-description" aria-labelledby="dialog-name">' +
                    '<div id="dialog-window">' +
                        '<div id="dialog-name"></div>' +
                        '<div id="dialog-description"></div>' +
                        '<button id="dialog-fullfilment" class="button">Ok</button>' +
                        '<button id="dialog-rejection" class="button">Cancel</button>' +
                    '</div>' +
                '</div>';


    html = new DOMParser().parseFromString(html, 'text/html');

            var container = html.querySelector('#sibling-stacking-context'),
                   dialog = html.querySelector('#dialog'),
             dialogWindow = html.querySelector('#dialog-window'),
              description = html.querySelector('#dialog-description'),
                     name = html.querySelector('#dialog-name'),
        fullfilmentButton = html.querySelector('#dialog-fullfilment'),
          rejectionButton = html.querySelector('#dialog-rejection');


    var body = document.body;


    // dialog closes when either of the these buttons is clicked 
    fullfilmentButton.addEventListener('click', clickHandler);
      rejectionButton.addEventListener('click', clickHandler);

    function clickHandler(event) {
        obj.open = false;
        this.id === 'dialog-fullfilment' ? obj.onfulfilled() : obj.onrejected();
    }


    var obj = {
        // mimics 'window.alert()'
        alert: function (/*name, description*/) {
            dialog.setAttribute('role', 'alertdialog');
            name.textContent = arguments[0];
            description.textContent = arguments[1];
            dialogWindow.append(fullfilmentButton);
            this.open = true;
        },

        // mimics 'window.confirm()'
        confirm: function (/*name, description*/) {
            dialog.setAttribute('role', 'dialog');
            name.textContent = arguments[0];
            description.textContent = arguments[1];
            dialogWindow.append(fullfilmentButton, rejectionButton);
            this.open = true;
        },

        // called when 'fullfilmentButton' is pressed
        onfulfilled: function () { },

        // called when 'rejectionButton' is pressed
        onrejected: function () { },

        set open(value) {
            if (value) {
                Element.prototype.append.apply(container, body.children);
                body.append(container, dialog);
                body.style.overflowY = 'hidden';
            }
            else {
                Element.prototype.append.apply(body, container.children);
                container.remove();
                dialog.remove();
                rejectionButton.remove();
                body.style.overflowY = '';
            }
        },
    };

    return obj;
})();