'use strict';

var m = angular.module('app.common.directives', []);

m.directive('listSelect', function () {
  return {
    restrict: 'E',
    templateUrl: 'common/list-select.html',
    scope: {
      options: '=',
      selectedList: '=',
      display: '@',
      maxSelections: '@'
    },
    link: function (scope) {
      scope.selected = {};

      if (!scope.selectedList) {
        scope.selectedList = [];
      }

      scope.add = function () {
        if (_.findIndex(scope.selectedList, scope.selected) < 0 && (!scope.maxSelections || scope.maxSelections > scope.selectedList.length)) {
          scope.selectedList.push(scope.selected);
        }
      };

      scope.remove = function (item) {
        _.remove(scope.selectedList, item);
      };
    }
  };
});
