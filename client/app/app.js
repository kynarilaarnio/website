'use strict';

var m = angular.module('app', [
  'angularMoment',
  'ngAnimate',
  'ngCookies',
  'ngMessages',
  'pascalprecht.translate',
  'ui.router',

  // Application configuration
  'app.common.config',

  // Pre-cached partials
  'app.partials',

  // Features
  'app.navigation',
  'app.main',
  'app.newssheet',
  'app.team',
  'app.player',
  'app.match'
]);

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
