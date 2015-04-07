'use strict';

describe('controllers', function () {
  var scope;

  beforeEach(module('app'));

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('first value in numbers array should be 2', inject(function ($controller) {
    expect(scope.numbers).toBeUndefined();

    $controller('MainController', {
      $scope: scope
    });

    expect(angular.isArray(scope.numbers)).toBeTruthy();
    expect(scope.numbers[0]).toEqual(2);
  }));
});
