'use strict';

var m = angular.module('app.main', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.main', {
      url: 'main',
      views: {
        'main@': {
          templateUrl: 'main/main.html',
          controller: 'MainController'
        }
      }
    });
});

m.controller('MainController', function ($scope) {

});
