'use strict';

var m = angular.module('app.rules', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.rules', {
      url: 'rules',
      views: {
        'main@': {
          templateUrl: 'rules/rules.html',
        }
      }
    });
});
