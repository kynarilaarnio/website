'use strict';

describe('controllers', function () {
  var scope;

  beforeEach(module('app'));

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('placeholder test', inject(function ($controller) {
    return true;
  }));
});
