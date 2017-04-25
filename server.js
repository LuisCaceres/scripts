var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5001));

app.use(express.static(__dirname + '/components'));

// views is directory for all template files
app.set('views', __dirname + '/input');
app.set('view engine', 'jade');

app.get('*', function(request, response) {
  var url = request.url;
  if (url.indexOf('.') > -1 === false) {
    console.log(url);
    url = url.replace(/-/g, ' ');
    response.sendFile(__dirname + `/components${url}/index.html`);
  }
  else {
    console.log(url);
  }
});

app.get('/accessibility', function(request, response) {
  response.render('pages/accessibility');
});

app.get('/turtle', function(request, response) {
  response.render('pages/turtle');
});

app.get('/two-dimensional-navigation', function(request, response) {
  response.render('pages/two-dimensional-navigation');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




/* The purpose of the following piece of code is to eliminate the need of manually 
assigning values to 'id' attributes. This is especially true when the value is 
absolutely meaningless and does not convey any information about the application 
to the user. */
function* IDGenerator() {
    var number = 0;
    while (true) {
        yield "a" + number++;
    }
}

global.IDGenerator = IDGenerator();