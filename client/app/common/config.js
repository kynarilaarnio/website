'use strict';

var m = angular.module('app.common.config', []);

m.config(function ($translateProvider) {
  // Initialize angular-translate
  $translateProvider.useStaticFilesLoader({
    prefix: 'i18n/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('fi');
  $translateProvider.useCookieStorage();
  $translateProvider.useMissingTranslationHandlerLog();
});
