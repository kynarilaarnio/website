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
  'app.main'
]);

m.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('kynarilaarnio', {
      url: '/',
      abstract: true,
    });

  $urlRouterProvider.otherwise('/main');
});
