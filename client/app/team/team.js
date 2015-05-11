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
    },
    {
      id: 4,
      name: 'TiK 1',
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
      id: 5,
      name: 'Cluster 1',
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
      id: 6,
      name: 'Oulu :ASd',
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
      id: 7,
      name: 'Digit 2',
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
      id: 8,
      name: 'random',
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
      id: 9,
      name: 'Digit 1',
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
    },
    {
      id: 4,
      name: 'TiK 1',
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
      id: 5,
      name: 'Cluster 1',
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
      id: 6,
      name: 'Oulu :ASd',
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
      id: 7,
      name: 'Digit 2',
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
      id: 8,
      name: 'random',
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
      id: 9,
      name: 'Digit 1',
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
    },
    {
      id: 4,
      name: 'TiK 1',
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
      id: 5,
      name: 'Cluster 1',
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
      id: 6,
      name: 'Oulu :ASd',
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
      id: 7,
      name: 'Digit 2',
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
      id: 8,
      name: 'random',
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
      id: 9,
      name: 'Digit 1',
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
    },
    {
      id: 4,
      name: 'TiK 1',
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
      id: 5,
      name: 'Cluster 1',
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
      id: 6,
      name: 'Oulu :ASd',
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
      id: 7,
      name: 'Digit 2',
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
      id: 8,
      name: 'random',
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
      id: 9,
      name: 'Digit 1',
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
      id: 6,
      name: 'Oulu :ASd',
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
      id: 7,
      name: 'Digit 2',
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
      id: 8,
      name: 'random',
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
      id: 9,
      name: 'Digit 1',
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
      id: 6,
      name: 'Oulu :ASd',
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
      id: 7,
      name: 'Digit 2',
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
      id: 8,
      name: 'random',
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
      id: 9,
      name: 'Digit 1',
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
    templateUrl: 'team/team-large.html',
    scope: {
      template: '@',
      content: '='
    },
    controller: function ($scope) {
      $scope.getTemplateUrl = function () {
        switch ($scope.template) {
          case 'mini':
            return 'team/team-mini.html';
          case 'large':
            return 'team/team-large.html';
          case 'profile':
            return 'team/team-profile.html';
        }
      };

      $scope.team = $scope.content;
    }
  };
});
