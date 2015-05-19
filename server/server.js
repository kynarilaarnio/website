'use strict';

var express        = require('express');
var bodyParser     = require('body-parser');
var errorHandler   = require('errorhandler');
var morgan         = require('morgan');
var http           = require('http');
var db             = require('./models');

var users = require('./routes/users');
var teams = require('./routes/teams');
var groups = require('./routes/groups');
var rounds = require('./routes/rounds');
var matches = require('./routes/matches');

var app = express();

// all environments
app.set('port', process.env.PORT || 9000);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../_static'));

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}


app.get('/api/users', users.findAll);
app.get('/api/users/:id', users.find);
app.post('/api/users', users.create);
app.put('/api/users/:id', users.update);
app.delete('/api/users/:id', users.destroy);

app.get('/api/teams', teams.findAll);
app.get('/api/teams/:id', teams.find);
app.post('/api/teams', teams.create);
app.put('/api/teams/:id', teams.update);
app.delete('/api/teams/:id', teams.destroy);

app.get('/api/groups', groups.findAll);
app.get('/api/groups/:id', groups.find);
app.post('/api/groups', groups.create);
app.put('/api/groups/:id', groups.update);
app.delete('/api/groups/:id', groups.destroy);

app.get('/api/rounds', rounds.findAll);
app.get('/api/rounds/:id', rounds.find);
app.post('/api/rounds', rounds.create);
app.put('/api/rounds/:id', rounds.update);
app.delete('/api/rounds/:id', rounds.destroy);

app.get('/api/matches', matches.findAll);
app.get('/api/matches/:id', matches.find);
app.post('/api/matches', matches.create);
app.put('/api/matches/:id', matches.update);
app.delete('/api/matches/:id', matches.destroy);


db
  .sequelize
  .sync()
  .finally(function (err) {
    console.log(err);
    if (err) {
      throw err;
    }
    else {
      http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
      });
    }
  });
