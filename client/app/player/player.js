'use strict';

var m = angular.module('app.player', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.player', {
      abstract: true
    })

    .state('kynarilaarnio.player.profile', {
      url: 'players/:id',
      views: {
        'main@': {
          templateUrl: 'player/player-profile.html',
          controller: 'PlayerProfileController'
        }
      },
      resolve: {
        player: function (Users, $stateParams) {
          return Users.get({ id: $stateParams.id });
        }
      }
    })

    .state('kynarilaarnio.player.profile.edit', {
      url: '/edit',
      views: {
        'main@': {
          templateUrl: 'player/player-profile-edit.html',
          controller: 'PlayerProfileEditController'
        }
      },
      resolve: {
        player: function (Users, $stateParams) {
          return Users.get({ id: $stateParams.id });
        }
      }
    });
});

m.controller('PlayerProfileController', function ($scope, player) {
  $scope.player = player;
});

m.controller('PlayerProfileEditController', function ($scope, $state, Users, Teams, player) {
  $scope.player = player;

  $scope.saveProfile = function () {
    Users.update($scope.player).then(function (response) {
      $state.go('kynarilaarnio.profile', { id: response.id });
    });
  };

  $scope.saveTeam = function () {
    Teams.update($scope.player.team).then(function (response) {
      $state.go('kynarilaarnio.profile', { id: $scope.player.id });
    });
  };
});
