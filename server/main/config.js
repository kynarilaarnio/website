'use strict';

var session     = require('express-session'),
    mongoose    = require('mongoose'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    passport    = require('passport'),
    middle      = require('./middleware');

var SteamStrategy = require('../../node_modules/passport-steam').Strategy;

var guilds = require('../guild/guild.controllers.js');
var users = require('../user/user.controllers.js');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log(user.identifier);
  users.deserializeUser(user.identifier, function (err, user) {
    done(err, user);
  });
});

var url = process.env.URL || 'http://localhost';
var port = process.env.PORT || 9000;

passport.use(new SteamStrategy({
    profile: false,
    returnURL: url + ':' + port + '/auth/steam/return',
    realm: url + ':' + port + '/'
  },
  function(identifier, user, done) {
    process.nextTick(function () {
      user.identifier = identifier;
      return done(null, user);
    });
  }
));

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/kynarilaarnio');
/*
 * Include all your global env variables here.
*/
module.exports = exports = function (app, express, routers) {
  app.set('port', process.env.PORT || 9000);
  app.set('base url', process.env.URL || 'http://localhost');
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(session({
    secret: 'secret dragon magic :D:D this will probably still be the secret in production',
    saveUninitialized: true,
    resave: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(middle.cors);
  app.use(express.static(__dirname + '/../../_static'));

  app.get('/api/account',
    function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }

      res.redirect('/');
    },
    function (req, res) {
      res.render('account', { user: req.user });
    });

  app.get('/api/login', function (req, res){
    res.send(req.isAuthenticated() ? req.user : null);
  });

  app.get('/api/auth/steam',
    passport.authenticate('steam', { failureRedirect: '/' }),
      function(req, res) {
        res.send(req.user);
      });

  app.get('/api/logout', function(req, res){
    req.logout();
    res.send(200);
  });

  app.route('/api/guilds').get(guilds.get);

  app.use(middle.logError);
  app.use(middle.handleError);

};
