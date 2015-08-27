'use strict';

var m = angular.module('app', [
  'angularMoment',
  'btford.markdown',
  'ngAnimate',
  'ngCookies',
  'ngFx',
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
  'app.common.services',

  // Pre-cached partials
  'app.partials',

  // Features
  'app.account.service',
  'app.admin',
  'app.group',
  'app.invitationCode',
  'app.main',
  'app.match',
  'app.navigation',
  'app.newssheet',
  'app.player',
  'app.registration',
  'app.rules',
  'app.team',
  'app.playoffs'
]);

m.run(function (AuthService) {
  AuthService.requestCurrentUser();
});

m.run(function ($rootScope, AuthService) {
  $rootScope.account = AuthService;
});

m.run(function ($rootScope, Notifications) {
  $rootScope.Notifications = Notifications;
});

m.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('kynarilaarnio', {
      url: '/',
      abstract: true,
    });

  $urlRouterProvider.otherwise('/main');

  $httpProvider.interceptors.push(function ($q, Notifications) {
    return {
      response: function (response) {
        return response;
      },
      responseError: function (response) {
        Notifications.set('global.error', Notifications.types.error);

        return $q.reject(response);
      }
    };
  });
});
