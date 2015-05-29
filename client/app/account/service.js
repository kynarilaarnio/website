'use strict';

var m = angular.module('app.account.service', []);

m.factory('AuthService', function ($http, $timeout, $q) {
  var service = {
    currentUser: null,

    requestCurrentUser: function () {
      if (service.isAuthenticated()) {
        return $q.when(service.currentUser);
      }
      else {
        return $http.get('/user').then(function (response) {
          service.currentUser = response.data;

          return service.currentUser;
        });
      }
    },

    isAuthenticated: function () {
      return !!service.currentUser;
    },

    isAdmin: function () {
      return service.isAuthenticated() && (service.currentUser.role === 'admin');
    }
  };

  return service;
});
