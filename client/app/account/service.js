'use strict';

var m = angular.module('app.account.service', []);

m.factory('Account', function ($resource) {
  return $resource('/auth/users/:id', {}, {
    'update': {
      method: 'PUT'
    }
  });
});

m.factory('Auth', function ($rootScope, $q, $http, $location, $cookieStore) {
  $rootScope.currentUser = $cookieStore.get('user') || null;
  $cookieStore.remove('user');

  return {
    requestCurrentUser: function () {
      var deferred = $q.defer();

      $http.get('/loggedin').success(function(user){
        if (user !== null) {
          deferred.resolve();
        }
        else {
          deferred.reject();
          $location.url('/');
        }
      });

      return deferred.promise;
    },

    login: function () {
    },

    logout: function () {
    },

    currentUser: function () {
    }
  };
});
