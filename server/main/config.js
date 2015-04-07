'use strict';

var mongoose    = require('mongoose'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    middle      = require('./middleware');

var guild = require('../guild/guild.controllers.js');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/kynarilaarnio');
/*
 * Include all your global env variables here.
*/
module.exports = exports = function (app, express) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(middle.cors);
  app.use(express.static(__dirname + '/../../_static'));

  app.route('/api/guilds').get(guild.get);

  app.use(middle.logError);
  app.use(middle.handleError);
};
