'use strict';

var m = angular.module('app.common.resources', []);

m.factory('Users', function ($resource) {
  return $resource('api/users/:id', { 'id': '@id' },
    {
      'update': { method: 'PUT' }
    });
});

m.factory('Teams', function ($resource) {
  return $resource('api/teams/:id', { 'id': '@id' },
    {
      'update': { method: 'PUT' }
    });
});

m.factory('Groups', function ($resource) {
  return $resource('api/groups/:id', { 'id': '@id' },
    {
      'update': { method: 'PUT' }
    });
});

m.factory('Events', function ($resource) {
  return $resource('api/events/:id', { 'id': '@id' },
    {
      'update': { method: 'PUT' }
    });
});

m.factory('News', function ($resource) {
  return $resource('api/news/:id', { 'id': '@id' },
    {
      'update': { method: 'PUT' }
    });
});

m.factory('InvitationCodes', function ($resource) {
  return $resource('api/invitationcodes/:id', { 'id': '@id' },
    {
      'save': { method: 'POST', isArray: true }
    }
  );
});
