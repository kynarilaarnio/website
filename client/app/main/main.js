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

m.controller('MainController', function ($scope, $http) {
  $scope.streamIsOnline = false;

  $scope.init = function() {

    // Check if stream is active
    $http.get('https://api.twitch.tv/kraken/streams/tietoteekkarikilta')
    .then(function success(response) {
      // If stream attribute exists, the stream is online
      $scope.streamIsOnline = Boolean(response.data.stream);
    });
  }
});
