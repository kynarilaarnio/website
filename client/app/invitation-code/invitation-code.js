'use strict';

var m = angular.module('app.invitationCode', []);

m.controller('InvitationCodeController', function ($scope, InvitationCodes, InvitationTypes) {
  $scope.invitationCodes = InvitationCodes.query();
  $scope.InvitationTypes = InvitationTypes;

  $scope.amount = 0;
  $scope.type = undefined;

  $scope.searchString;
  $scope.showRedeemed = true;

  $scope.generateInvitationCodes = function () {
    InvitationCodes.save({ amount: $scope.amount, type: $scope.type })
    .$promise.then(function (response) {
      $scope.invitationCodes = response;
    });
  };

  // filter which shows only codes with usedBy-attribute (= redeemed codes)
  // can be overridden if showRedeemed = true
  $scope.filterRedeemed = function(item) {
      return $scope.showRedeemed || !item.usedBy;
  };
});
