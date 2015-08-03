'use strict';

var m = angular.module('app.common.directives', []);

var template = ['<div class="hero__wrapper">',
  '<div class="hero__slope"></div>',
  '<h2 class="hero__title"><ng-transclude></ng-transclude></h2>',
'</div>'].join('');

m.directive('aklHero', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: template
  };
});
