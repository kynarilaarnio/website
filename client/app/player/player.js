'use strict';

var m = angular.module('app.player', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.player', {
      abstract: true
    });

  $stateProvider
    .state('kynarilaarnio.player.profile', {
      url: 'players/:id',
      views: {
        'main@': {
          templateUrl: 'player/player-profile.html',
          controller: 'PlayerProfileController'
        }
      }
    });
});

m.controller('PlayerProfileController', function ($scope) {
});
