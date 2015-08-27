'use strict';

var m = angular.module('app.playoffs', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.playoffs', {
      url: 'playoffs',
      views: {
        'main@': {
          templateUrl: 'playoffs/playoffs.html',
          controller: 'PlayoffsController'
        }
      }
    });
});

m.controller('PlayoffsController', function ($scope) {
  // nothing here, do everything manually :(
});
