'use strict';

var m = angular.module('app', [
  'angularMoment',
  'btford.markdown',
  'ngAnimate',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngSanitize',
  'pascalprecht.translate',
  'ui.router',

  // Application configuration and other common stuff
  'app.common.config',
  'app.common.constants',
  'app.common.directives',
  'app.common.resources',

  // Pre-cached partials
  'app.partials',

  // Features
  'app.account.service',
  'app.admin',
  'app.invitationCode',
  'app.main',
  'app.match',
  'app.navigation',
  'app.newssheet',
  'app.player',
  'app.registration',
  'app.rules',
  'app.team'
]);

m.run(function (AuthService) {
  AuthService.requestCurrentUser();
});

m.run(function ($rootScope, AuthService) {
  $rootScope.account = AuthService;
});

m.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('kynarilaarnio', {
      url: '/',
      abstract: true,
    });

  $urlRouterProvider.otherwise('/main');

  $httpProvider.interceptors.push(function ($q, $location) {
    return {
      response: function (response) {
        return response;
      },
      responseError: function (response) {
        if (response.status === 401) {
          $location.url('/');
        }

        return $q.reject(response);
      }
    };
  });
});
