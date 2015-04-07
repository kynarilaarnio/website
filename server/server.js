'use strict';

var app   = require('./main/app.js');
var port  = app.get('port');

if (process.argv.length === 3) {
  port = process.argv[2];
}

var log   = 'Listening on ' + app.get('base url') + ':' + port;

app.listen(port);
console.log(log);
