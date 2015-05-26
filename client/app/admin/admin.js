'use strict';

var m = angular.module('app.admin', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.admin', {
      url: 'admin',
      views: {
        'main@': {
          templateUrl: 'admin/dashboard.html',
          controller: 'AdminDashboardController'
        }
      }
    });
});

m.controller('AdminDashboardController', function ($scope, Users, Teams, Groups, Events, News, Ranks) {
  $scope.target = {};
  $scope.filter = '';
  $scope.config = undefined;
  $scope.content = [];

  $scope.Ranks = Ranks;

  $scope.users = {
    orderBy: 'nick',
    displayKeys: [ 'nick', 'name', 'team' ],
    templateUrl: 'player/player-edit.html',
    resolve: function () {
      $scope.player = $scope.target;
    },
    resource: function () {
      return Users;
    }
  };

  $scope.teams = {
    orderBy: 'name',
    displayKeys: [ 'name' ],
    templateUrl: 'team/team-edit.html',
    resolve: function () {
      $scope.team = $scope.target;

      if (!$scope.userList) {
        $scope.userList = Users.query();
      };

      // Resolve team captain from userList and match select components ng-model with its ng-options
      $scope.userList.$promise.then(function () {
        if ($scope.team.captain) {
          $scope.team.captain = _.find($scope.userList, { 'id': $scope.team.captain.id });
        }
      });
    },
    resource: function () {
      return Teams;
    }
  };

  $scope.groups = {
    orderBy: 'name',
    displayKeys: [ 'name' ],
    templateUrl: 'group/group-edit.html',
    resolve: function () {
      $scope.group = $scope.target;
      if (!$scope.group.teams) {
        $scope.group.teams = [];
      }

      if (!$scope.teamList) {
        $scope.teamList = Teams.query();
      }
    },
    resource: function () {
      return Groups;
    }
  };

  $scope.schedule = {
    orderBy: 'date',
    displayKeys: [ 'date', 'title' ],
    resource: function () {
      return Events;
    }
  };

  $scope.news = {
    orderBy: 'published',
    displayKeys: [ 'date', 'title' ],
    resource: function () {
      return News;
    }
  };

  $scope.setConfig = function (config) {
    $scope.target = {};
    $scope.config = config;
    $scope.content = $scope.config.resource().query();
    if ($scope.config.resolve) {
      $scope.config.resolve();
    }
  };

  $scope.setTarget = function (item) {
    $scope.target = angular.copy(item);
    if ($scope.config.resolve) {
      $scope.config.resolve();
    }
  };

  $scope.save = function () {
    var saveSuccessful = function (response) {
      $scope.target = response;
      var index = _.findIndex($scope.content, { 'id': $scope.target.id })

      if (index < 0) {
        $scope.content.push($scope.target);
      }
      else {
        $scope.content[index] = $scope.target;
      }

      $scope.setConfig($scope.config);
    };

    if ($scope.target.id) {
      $scope.config.resource().update($scope.target).$promise.then(saveSuccessful);
    }
    else {
      $scope.config.resource().save($scope.target).$promise.then(saveSuccessful);
    }
  };
});
