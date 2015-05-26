'use strict';

var m = angular.module('app.registration', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.registration', {
      url: 'registration',
      views: {
        'main@': {
          templateUrl: 'registration/registration.html',
          controller: 'RegistrationController'
        }
      }
    });
});

m.controller('RegistrationController', function ($scope) {
  $scope.invitationCode = '';

  $scope.register = function () {

  };
});
