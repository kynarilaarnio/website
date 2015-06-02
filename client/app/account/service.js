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
        return $http.get('/api/user').then(function (response) {
          service.currentUser = response.data;

          return service.currentUser;
        });
      }
    },

    isAuthenticated: function () {
      return !!service.currentUser;
    },

    isCurrentUser: function (id) {
      return service.isAuthenticated() && (service.currentUser.id === id);
    },

    isAdmin: function () {
      return service.isAuthenticated() && (service.currentUser.role === 'admin');
    }
  };

  return service;
});
