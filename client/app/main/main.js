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
  $scope.newssheets = [
    { timestamp: Date.now(),
      title: 'Testitiedote pitkällä ingresilla',
      ingress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed est nec urna consectetur tincidunt at in nibh. Quisque sapien justo, blandit eu volutpat a, accumsan vitae lacus. Phasellus magna risus, suscipit non lectus tincidunt, maximus ullamcorper massa. Donec rhoncus est eget neque euismod feugiat. Praesent ut venenatis augue. Maecenas ipsum sem, cursus vitae orci et, molestie sodales ante. Maecenas volutpat vitae lacus porttitor maximus. Vestibulum eget commodo tortor. Sed sodales felis a vestibulum placerat. In suscipit ipsum at egestas imperdiet. Curabitur laoreet, lectus id ultricies malesuada, erat elit venenatis ante, at pretium augue justo a augue. Curabitur viverra vestibulum faucibus. Cras ornare laoreet enim.'
    },
    {
      timestamp: Date.now(),
      title: 'Testitiedote lyhyellä ingresilla',
      ingress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed est nec urna consectetur tincidunt at in nibh.'
    },
    {
      timestamp: Date.now(),
      title: 'Testitiedote lyhyellä ingresilla ja äärimmääääääiseeeeen piiiiiiiiitkäääääääällä otsikolla :asdas.d A S.d :AS:DA: ASD:SA:D .ASD:A:SD ASD:AS:D::DSA  :SA:Dasd ASD: :CS_KIMMO',
      ingress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed est nec urna consectetur tincidunt at in nibh.'
    },
    {
      timestamp: Date.now(),
      title: 'Testitiedote keskipitkällä ingresilla',
      ingress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed est nec urna consectetur tincidunt at in nibh. Quisque sapien justo, blandit eu volutpat a, accumsan vitae lacus. Phasellus magna risus, suscipit non lectus tincidunt, maximus ullamcorper massa. Donec rhoncus est eget neque euismod feugiat. Praesent ut venenatis augue.'
    },
    {
      timestamp: Date.now(),
      title: 'Testitiedote lyhyellä ingresilla',
      ingress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed est nec urna consectetur tincidunt at in nibh.'
    },
    {
      timestamp: Date.now(),
      title: 'Testitiedote lyhyellä ingresilla',
      ingress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed est nec urna consectetur tincidunt at in nibh.'
    },
    {
      timestamp: Date.now(),
      title: 'Testitiedote lyhyellä ingresilla',
      ingress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed est nec urna consectetur tincidunt at in nibh.'
    }
  ];

  $scope.matches = [
    {
      away: {
        name: 'Tommi Sotkan Penis'
      },
      home: {
        name: 'Digit 1'
      }
    },
    {
      away: {
        name: 'Digit 2'
      },
      home: {
        name: 'TiK'
      }
    },
    {
      away: {
        name: 'Cluster 1'
      },
      home: {
        name: 'Cluster 2'
      }
    }
  ];
});
