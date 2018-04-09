/* The following piece of code creates a static server for the root folder and
subfolders. It does not rely on any libraries. This is written in vanilla
JavaScript for Node JS. To create the server go to the root folder and open the
command line. Then type node server. You should be able to access any files on
an Internet browser. */

// Let PORT be one of the supported ports on Safari for Browser Stack.
const PORT = 8080;

const fs = require('fs');
const http = require('http');
const path = require('path');

const mimeTypes = {
	'.css': 'text/css',
	'.eot': 'application/vnd.ms-fontobject',
	'.gif': 'image/gif',
	'.html': 'text/html',
	'.jpg': 'image/jpg',
	'.js': 'text/javascript',
	'.json': 'application/json',
	'.mp4': 'video/mp4',
	'.otf': 'application/font-otf',
	'.png': 'image/png',
	'.svg': 'application/image/svg+xml',
	'.ttf': 'application/font-ttf',
	'.wav': 'audio/wav',
	'.woff': 'application/font-woff',
};


/** Invoke this function each time the entire contents of a file have been read.
 * @param {String} contentType
 * @param {http.ServerResponse} response
 * @param {Error} error
 * @param {String} data
 */
function onReadFile(contentType, response, error, data) {;
	if (error) {
		if (error.code == 'ENOENT') {
			fs.readFile('./404.html', function (error, content) {
				response.writeHead(200, { 'Content-Type': contentType });
				response.end(content, 'utf-8');
			});
		}
		else {
			response.writeHead(500);
			response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
			response.end();
		}
	}
	else {
		response.writeHead(200, { 'Cache-Control': 'no-store', 'Content-Type': contentType });
		response.end(data, 'utf-8');
	}
}


/** Invoke this function each time there is a request.
 * @param {http.IncomingMessage} request
 * @param {http.ServerResponse} response
 */
function onRequest(request, response) {
	const FILE_PATH = request.url === '/' ? './index.html' : '.' + request.url;
	const EXTENSION = path.extname(FILE_PATH).toLowerCase();
	const CONTENT_TYPE = mimeTypes[EXTENSION] || 'application/octet-stream';

	fs.readFile(FILE_PATH, onReadFile.bind(null, CONTENT_TYPE, response));
}


http.createServer(onRequest).listen(PORT);
console.log('Server running at http://127.0.0.1:8080/');

// TO DO: Use promises to improve the readibility of this code.