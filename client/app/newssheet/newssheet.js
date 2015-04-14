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
