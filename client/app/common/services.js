'use strict';

var m = angular.module('app.common.services', []);

m.constant('NotificationTimeout', 2000);
m.constant('ErrorNotificationTimeout', 4000);

m.factory('Notifications', function ($timeout, NotificationTimeout, ErrorNotificationTimeout) {
  var messageQueue = [];
  var currentMessage = null;

  return {
    types: {
      generic: 0,
      success: 1,
      error: 2
    },
    set: function (content, type, parameters) {
      var classes = [];
      var displayTime = NotificationTimeout;

      switch (type) {
        case this.types.generic:
          classes = [ 'generic' ];
          break;
        case this.types.success:
          classes = [ 'success' ];
          break;
        case this.types.error:
          classes = [ 'error' ];
          displayTime = ErrorNotificationTimeout;
          break;
        default:
          classes = [ 'generic' ];
          break;
      }

      var message = {
        classes: classes,
        content: content,
        displayTime: displayTime,
        parameters: parameters || {}
      };

      messageQueue.push(message);

      var messageTimeout = currentMessage ? currentMessage.displayTime : 0;
      messageQueue.forEach(function (msg) {
        messageTimeout += msg.displayTime;
      });

      if (!currentMessage) {
        currentMessage = messageQueue.shift();
      }

      $timeout(function () {
        currentMessage = messageQueue.shift() || null;
      }, messageTimeout);
    },
    get: function () {
      return currentMessage;
    }
  };
});
