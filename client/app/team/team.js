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
      name: 'Tommi Sotkan Penis'
    },
    {
      id: 2,
      name: 'Fuksijoukkue'
    },
    {
      id: 3,
      name: 'TiTe 2'
    },
    {
      id: 4,
      name: 'TiK 1'
    },
    {
      id: 5,
      name: 'Cluster 1'
    },
    {
      id: 6,
      name: 'Oulu :ASd'
    },
    {
      id: 7,
      name: 'Digit 2'
    },
    {
      id: 8,
      name: 'random'
    },
    {
      id: 9,
      name: 'Digit 1'
    },
  ];
});

m.controller('TeamProfileController', function ($scope) {
});

m.directive('team', function () {
  return {
    restrict: 'E',
    template: '<ng-include src="getTemplateUrl()"></ng-include>',
    scope: {
      template: '@',
      content: '='
    },
    link: function (scope) {
      scope.getTemplateUrl = function () {
        switch (scope.template) {
          case 'mini':
            return 'team/team-mini.html';
          case 'large':
            return 'team/team-large.html';
          case 'profile':
            return 'team/team-profile.html';
        }
      }
    }
  }
});
