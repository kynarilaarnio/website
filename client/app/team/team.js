'use strict';

var m = angular.module('app.team', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.team', {
      url: 'teams',
      views: {
        'main@': {
          templateUrl: 'team/team-profile.html',
          controller: 'TeamListController'
        }
      }
    });

  $stateProvider
    .state('kynarilaarnio.team.profile', {
      url: 'teams/:id',
      views: {
        'main@': {
          templateUrl: 'team/team-profile.html',
          controller: 'TeamProfileController'
        }
      }
    });
});

m.controller('TeamListController', function ($scope) {
});

m.controller('TeamProfileController', function ($scope) {
});
