'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonka = require("wonka/src/Wonka.bs.js");
var WonkaJs = require("wonka/src/web/WonkaJs.bs.js");
var Array_js = require("wonka/src/include/rebel_js/Array_js.bs.js");
var Wonka_sources = require("wonka/src/Wonka_sources.bs.js");

function make(callback) {
  return Wonka_sources.make(function (observer) {
              var teardown = Curry._1(callback, observer);
              return function () {
                return Curry._1(teardown, undefined);
              };
            });
}

function fromPromiseSafe(promise) {
  return Wonka.make(function (observer) {
              var cancelled = {
                contents: false
              };
              promise.then(function (value) {
                        return Promise.resolve({
                                    TAG: 0,
                                    _0: value,
                                    [Symbol.for("name")]: "Ok"
                                  });
                      }).catch(function (error) {
                      return Promise.resolve({
                                  TAG: 1,
                                  _0: error,
                                  [Symbol.for("name")]: "Error"
                                });
                    }).then(function (value) {
                    if (!cancelled.contents) {
                      Curry._1(observer.next, value);
                      Curry._1(observer.complete, undefined);
                    }
                    return Promise.resolve(undefined);
                  });
              return function () {
                cancelled.contents = true;
                
              };
            });
}

function makeReplaySubject(bufferSize) {
  var state = {
    values: new Array(),
    sinks: new Array(),
    ended: false
  };
  var source = function (sink) {
    var isClosed = {
      contents: false
    };
    state.sinks = state.sinks.concat(sink);
    sink({
          TAG: 0,
          _0: (function (signal) {
              if (signal) {
                state.sinks = state.sinks.filter(function (x) {
                      return x !== sink;
                    });
                isClosed.contents = true;
                return ;
              }
              
            }),
          [Symbol.for("name")]: "Start"
        });
    state.values.forEach(function (value) {
          if (!isClosed.contents) {
            return sink({
                        TAG: 1,
                        _0: value,
                        [Symbol.for("name")]: "Push"
                      });
          }
          
        });
    
  };
  var rebelPrepend = function (array, value) {
    return Array_js.make(1, value).concat(array);
  };
  var next = function (value) {
    if (state.ended) {
      return ;
    }
    var newValues = rebelPrepend(state.values, value);
    if (state.values.length > bufferSize) {
      newValues = newValues.slice(0, newValues.length - bufferSize | 0);
    }
    state.values = newValues;
    state.sinks.forEach(function (sink) {
          return sink({
                      TAG: 1,
                      _0: value,
                      [Symbol.for("name")]: "Push"
                    });
        });
    
  };
  var complete = function (param) {
    if (!state.ended) {
      state.ended = true;
      state.values = new Array();
      state.sinks.forEach(function (sink) {
            return sink(/* End */0);
          });
      return ;
    }
    
  };
  return {
          source: source,
          next: next,
          complete: complete
        };
}

var fromArray = Wonka_sources.fromArray;

var fromList = Wonka_sources.fromList;

var fromValue = Wonka_sources.fromValue;

var makeSubject = Wonka_sources.makeSubject;

var empty = Wonka_sources.empty;

var never = Wonka_sources.never;

var fromObservable = WonkaJs.fromObservable;

var toObservable = WonkaJs.toObservable;

var fromCallbag = WonkaJs.fromCallbag;

var toCallbag = WonkaJs.toCallbag;

var debounce = WonkaJs.debounce;

var delay = WonkaJs.delay;

var throttle = WonkaJs.throttle;

var toPromise = WonkaJs.toPromise;

var interval = WonkaJs.interval;

var fromDomEvent = WonkaJs.fromDomEvent;

var fromPromise = WonkaJs.fromPromise;

exports.fromArray = fromArray;
exports.fromList = fromList;
exports.fromValue = fromValue;
exports.makeSubject = makeSubject;
exports.empty = empty;
exports.never = never;
exports.fromObservable = fromObservable;
exports.toObservable = toObservable;
exports.fromCallbag = fromCallbag;
exports.toCallbag = toCallbag;
exports.debounce = debounce;
exports.delay = delay;
exports.throttle = throttle;
exports.toPromise = toPromise;
exports.interval = interval;
exports.fromDomEvent = fromDomEvent;
exports.fromPromise = fromPromise;
exports.make = make;
exports.fromPromiseSafe = fromPromiseSafe;
exports.makeReplaySubject = makeReplaySubject;
/* Wonka Not a pure module */
