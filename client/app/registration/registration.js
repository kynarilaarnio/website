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

m.controller('RegistrationController', function ($scope, $http, $state) {
  $scope.invitationCode = '';
  $scope.error = false;

  $scope.register = function () {
    $http.post('/api/register', { code: $scope.invitationCode })
      .success(function (response) {
        $state.go('kynarilaarnio.player.profile.edit', { id: response.id });
      })
      .error(function (response) {
        $scope.error = true;
      });
  };
});
