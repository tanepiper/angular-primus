var PrimusSocketProvider;
PrimusSocketProvider = function () {
  "use strict";

  var PrimusSocket = null;

  this.setSocket = function (socket) {
    PrimusSocket = socket;
  };

  this.$get = ['$rootScope', function ($rootScope) {

    var emitCallback = function (callback, args) {
      $rootScope.$apply(function () {
        if (callback) {
          callback.apply(PrimusSocket, args);
        }
      });
    };

    return {
      getSocket: function() {
        return PrimusSocket;
      },
      on: function (name, callback) {
        PrimusSocket.on(name, function () {
          emitCallback(callback, arguments);
        });
      },
      write: function (data, callback) {
        PrimusSocket.write(angular.fromJson(angular.toJson(data)), function () {
          emitCallback(callback, arguments);
        });
      },
      send: function (name, data, callback) {
        PrimusSocket.send(name, angular.fromJson(angular.toJson(data)), function () {
          PrimusSocket.emitCallback(callback, arguments);
        });
      }
    };
  }];
};

module.export = angular.module('Primus', [])
  .provider('$primus', PrimusSocketProvider);
