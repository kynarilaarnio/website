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
  var index = 0;
  var counter = 1;

  $scope.numbers = [ 2, 3, 5, 7, 11 ];
  $scope.someNumber = $scope.numbers[index];

  $scope.newNumber = function () {
    index = counter++ % $scope.numbers.length;
    $scope.someNumber = $scope.numbers[index];
  };
});
