// MISCELLANEOUS
require('./../Class Iterator/Class Iterator.js');
require('./../Class Rectangle/Class Rectangle.js');


function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};

// this should be the very last line of code as the execution of the following 
// depends on the availability (non-undefined) classes.



// creates Document Object Model Tree
{
    let document = global.document = new Document(),
        html = new Node(),
        body = new Node(),
        head = new Node();

    document.body = body;
    document.head = head;
    document.rootElement = html;

    document.appendChild(html);
    html.appendChild(head);
    html.appendChild(body);
}