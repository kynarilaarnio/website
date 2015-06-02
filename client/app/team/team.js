'use strict';

var m = angular.module('app.team', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.team', {
      url: 'teams',
      views: {
        'main@': {
          templateUrl: 'team/team-list.html',
          controller: 'TeamListController'
        }
      }
    });

  $stateProvider
    .state('kynarilaarnio.team.profile', {
      url: '/:id',
      views: {
        'main@': {
          templateUrl: 'team/team-profile.html',
          controller: 'TeamProfileController'
        }
      }
    });
});

m.controller('TeamListController', function ($scope) {
  $scope.teams = [
    {
      id: 1,
      name: 'Tommi Sotkan Penis',
      players: [
        {
          nick: 'Player 1'
        },
        {
          nick: 'Player 2'
        },
        {
          nick: 'Player 3'
        },
        {
          nick: 'Player 4'
        },
        {
          nick: 'Player 5'
        }
      ]
    },
    {
      id: 2,
      name: 'Fuksijoukkue',
      players: [
        {
          nick: 'Player 1'
        },
        {
          nick: 'Player 2'
        },
        {
          nick: 'Player 3'
        },
        {
          nick: 'Player 4'
        },
        {
          nick: 'Player 5'
        }
      ]
    },
    {
      id: 3,
      name: 'TiTe 2',
      players: [
        {
          nick: 'Player 1'
        },
        {
          nick: 'Player 2'
        },
        {
          nick: 'Player 3'
        },
        {
          nick: 'Player 4'
        },
        {
          nick: 'Player 5'
        }
      ]
    }
  ];
});

m.controller('TeamProfileController', function ($scope) {
});

