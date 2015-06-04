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
    })

    .state('kynarilaarnio.team.profile', {
      url: '/:id',
      views: {
        'main@': {
          templateUrl: 'team/team-profile.html',
          controller: 'TeamProfileController'
        }
      },
      resolve: {
        team: function (Teams, $stateParams) {
          return Teams.get({ id: $stateParams.id }).$promise;
        }
      }
    })

    .state('kynarilaarnio.team.profile.edit', {
      url: '/edit',
      views: {
        'main@': {
          templateUrl: 'team/team-profile-edit.html',
          controller: 'TeamProfileEditController'
        }
      },
      resolve: {
        team: function (Teams, $stateParams) {
          return Teams.get({ id: $stateParams.id }).$promise;
        }
      }
    });
});

m.controller('TeamListController', function ($scope) {
});

m.controller('TeamProfileController', function ($scope, Ranks, team) {
  team.rank = _.find(Ranks, { id: team.rank }).fullName;

  $scope.team = team;
});

m.controller('TeamProfileEditController', function ($scope, $state, Teams, Ranks, Notifications, team) {
  $scope.team = team;
  $scope.Ranks = Ranks;

  $scope.save = function () {
    Teams.update($scope.team).$promise.then(function (response) {
      Notifications.set('team.saveSuccess', Notifications.types.success);
    });
  };
});
