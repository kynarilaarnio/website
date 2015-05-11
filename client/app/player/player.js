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

m.directive('player', function () {
  return {
    restrict: 'E',
    templateUrl: 'player/player-mini.html',
    scope: {
      template: '@',
      content: '='
    },
    controller: function ($scope) {
      $scope.getTemplateUrl = function () {
        switch ($scope.template) {
          case 'mini':
            return 'player/player-mini.html';
          case 'large':
            return 'player/player-large.html';
          case 'profile':
            return 'player/player-profile.html';
        }
      };

      $scope.player = $scope.content;
    }
  };
});
