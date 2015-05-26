'use strict';

var express        = require('express');
var bodyParser     = require('body-parser');
var errorHandler   = require('errorhandler');
var morgan         = require('morgan');
var http           = require('http');
var passport       = require('passport');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var db             = require('./models');
var config         = require('./config.js');

var SteamStrategy  = require('passport-steam').Strategy;

var users = require('./routes/users');
var teams = require('./routes/teams');
var groups = require('./routes/groups');
var rounds = require('./routes/rounds');
var matches = require('./routes/matches');
var invitationCodes = require('./routes/invitation-codes');

var app = express();

// all environments
app.set('port', process.env.PORT || 9000);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({
  secret: 'super secret dragon magic :D:D',
  saveUninitialized: true,
  resave: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(db.user.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: config.baseUrl + ':' + config.port + '/auth/steam/return',
    realm: config.baseUrl + ':' + config.port + '/',
    apiKey: config.steamApiKey
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;

      return done(null, profile);
    });
  }
));

app.use(express.static(__dirname + '/../_static'));

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler());
}

var authorize = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.send(403);
};

app.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }));

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  });

app.get('/api/users', users.findAll);
app.get('/api/users/:id', users.find);
app.post('/api/users', authorize, users.authorize, users.create);
app.post('/api/registration/:invitationCode', authorize, users.register);
app.put('/api/users/:id', authorize, users.authorize, users.update);
app.delete('/api/users/:id', authorize, users.authorize, users.destroy);

app.get('/api/teams', teams.findAll);
app.get('/api/teams/:id', teams.find);
app.post('/api/teams', authorize,  teams.authorize, teams.create);
app.put('/api/teams/:id', authorize, teams.authorize, teams.update);
app.delete('/api/teams/:id', authorize, teams.authorize, teams.destroy);

app.get('/api/groups', groups.findAll);
app.get('/api/groups/:id', groups.find);
app.post('/api/groups', authorize, groups.authorize, groups.create);
app.put('/api/groups/:id', authorize, groups.authorize, groups.update);
app.delete('/api/groups/:id', authorize, groups.authorize, groups.destroy);

app.get('/api/rounds', rounds.findAll);
app.get('/api/rounds/:id', rounds.find);
app.post('/api/rounds', authorize, rounds.authorize, rounds.create);
app.put('/api/rounds/:id', authorize, rounds.authorize, rounds.update);
app.delete('/api/rounds/:id', authorize, rounds.authorize, rounds.destroy);

app.get('/api/matches', matches.findAll);
app.get('/api/matches/:id', matches.find);
app.post('/api/matches', authorize, matches.authorize, matches.create);
app.put('/api/matches/:id', authorize, matches.authorize, matches.update);
app.delete('/api/matches/:id', authorize, matches.authorize, matches.destroy);

app.get('/api/invitationcodes', invitationCodes.authorize, matches.findAll);
app.get('/api/invitationcodes/:id', invitationCodes.authorize, matches.find);
app.post('/api/invitationcodes', authorize, invitationCodes.authorize, matches.create);
app.put('/api/invitationcodes/:id', authorize, invitationCodes.authorize, matches.update);
app.delete('/api/invitationcodes/:id', authorize, invitationCodes.authorize, matches.destroy);

db
  .sequelize
  .sync()
  .finally(function (err) {
    if (err) {
      throw err;
    }
    else {
      http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
      });
    }
  });
