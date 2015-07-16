'use strict';

var m = angular.module('app.group', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.group', {
      url: 'groups',
      views: {
        'main@': {
          templateUrl: 'group/group-list.html',
          controller: 'GroupListController'
        }
      },
      resolve: {
        groups: function (Groups) {
          return Groups.query().$promise;
        }
      }
    });
});

m.controller('GroupListController', function ($scope, groups) {
  $scope.groupChunks = _(groups).sortBy('name').chunk(2).value();
});
