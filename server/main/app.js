'use strict';

var express = require('express');
var app = express();

var routers = {};

var Router = express.Router();
routers.Router = Router;

require('./config.js')(app, express, routers);

module.exports = exports = app;