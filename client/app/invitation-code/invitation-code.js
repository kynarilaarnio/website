'use strict';

var m = angular.module('app.invitationCode', []);

m.controller('InvitationCodeController', function ($scope, InvitationCodes, InvitationTypes) {
  $scope.invitationCodes = InvitationCodes.query();
  $scope.InvitationTypes = InvitationTypes;

  $scope.amount = 0;
  $scope.type = undefined;

  $scope.generateInvitationCodes = function () {
    InvitationCodes.save({ amount: $scope.amount, type: $scope.type }).$promise.then(function (response) {
      $scope.invitationCodes = response;
    });
  };
});
