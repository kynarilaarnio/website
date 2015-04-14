'use strict';

var m = angular.module('app.newssheet', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.newssheet', {
      url: 'newssheets/:id',
      views: {
        'main@': {
          templateUrl: 'newssheet/newssheet-article.html',
          controller: 'NewssheetController'
        }
      }
    });
});

m.controller('NewssheetArticleController', function ($scope) {
});

// Unnecessary directive probably(?!)
// Can be replaced with repeating ng-include template
// Pending further specification / implementation
m.directive('newssheet', function () {
  return {
    restrict: 'E',
    scope: {
      content: '='
    },
    templateUrl: 'newssheet/newssheet-mini.html',
  }
});
