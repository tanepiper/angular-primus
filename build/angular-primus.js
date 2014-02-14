(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])