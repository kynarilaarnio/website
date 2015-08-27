'use strict';

var m = angular.module('app.playoffs', []);

m.config(function ($stateProvider) {
  $stateProvider
    .state('kynarilaarnio.playoffs', {
      url: 'playoffs',
      views: {
        'main@': {
          templateUrl: 'playoffs/playoffs.html',
          controller: 'PlayoffsController'
        }
      }
    });
});

m.controller('PlayoffsController', function ($scope) {
  $scope.keke = 'test';

  // TODO: this would be cool.. see template. But the extra divs that
  // ng-repeat generates breaks flexbox
  $scope.rounds = [
    {
      roundNumber: 1,
      matchPairs: [1,2,3,4,5,6,7,8]
    },
    {
      roundNumber: 2,
      matchPairs: [9,10,11,12]
    },
    {
      roundNumber: 3,
      matchPairs: [13,14]
    },
    {
      roundNumber: 4,
      matchPairs: [15]
    }

  ];
});
