'use strict';

var m = angular.module('app.navigation', []);

m.directive('navigationDock', function ($window) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      var w = angular.element($window);
      var top = element[0].offsetTop;

      var onScroll = function () {
        if (top < w[0].pageYOffset && !element.hasClass('docked')) {
          element.addClass('docked');
        }

        if (top > w[0].pageYOffset && element.hasClass('docked')) {
          element.removeClass('docked');
        }
      };

      w.bind('resize', function () {
        element.removeClass('docked');
        top = element[0].offsetTop;
        onScroll();
      });

      w.bind('scroll', function () {
        onScroll();
      });
    }
  };
});
