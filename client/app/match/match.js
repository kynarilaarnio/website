'use strict';

var m = angular.module('app.match', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.match', {
      url: 'matches',
      views: {
        'main@': {
          templateUrl: 'team/match-list.html',
          controller: 'MatchListController'
        }
      }
    });

  $stateProvider
    .state('kynarilaarnio.match.report', {
      url: '/:id',
      views: {
        'main@': {
          templateUrl: 'match/match-report.html',
          controller: 'MatchReportController'
        }
      }
    });
});

m.controller('MatchListController', function ($scope) {
});

m.controller('MatchReportController', function ($scope) {
});

m.directive('match', function () {
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
            return 'match/match-mini.html';
          case 'large':
            return 'match/match-large.html';
          case 'report':
            return 'match/match-report.html';
        }
      };

      scope.match = scope.content;
    }
  };
});
