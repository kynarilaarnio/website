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

m.directive('team', function () {
  return {
    restrict: 'E',
    templateUrl: function (elem, attrs) {
      switch (attrs.template) {
        case 'mini':
          return 'team/team-mini.html';
        case 'large':
          return 'team/team-large.html';
        case 'profile':
          return 'team/team-profile.html';
      }
    },
    scope: {
      template: '@',
      content: '='
    },
    controller: function ($scope) {
      $scope.team = $scope.content;
    }
  };
});
