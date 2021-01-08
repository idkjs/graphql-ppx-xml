'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Wonka = require("wonka/src/Wonka.bs.js");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Wonka_operators = require("wonka/src/Wonka_operators.bs.js");
var XWonka_sinks$GraphqlPpxXml = require("./XWonka_sinks.bs.js");
var XWonka_sources$GraphqlPpxXml = require("./XWonka_sources.bs.js");

function filter(callback) {
  return Wonka.filter(Curry.__1(callback));
}

function debounce(callback) {
  return Wonka.debounce(Curry.__1(callback));
}

function throttle(callback) {
  return Wonka.throttle(Curry.__1(callback));
}

function concatMap(callback) {
  return Wonka.concatMap(Curry.__1(callback));
}

function map(callback) {
  return Wonka.map(Curry.__1(callback));
}

function tap(callback) {
  return Wonka.tap(Curry.__1(callback));
}

function scan(callback) {
  return function (param) {
    return Wonka.scan(Curry.__2(callback), param);
  };
}

function mergeMap(callback) {
  return Wonka.mergeMap(Curry.__1(callback));
}

function switchMap(callback) {
  return Wonka.switchMap(Curry.__1(callback));
}

function onPush(callback) {
  return Wonka.onPush(Curry.__1(callback));
}

function onEnd(callback) {
  return Wonka.onEnd(function () {
              return Curry._1(callback, undefined);
            });
}

function onStart(callback) {
  return Wonka.onStart(function () {
              return Curry._1(callback, undefined);
            });
}

function mapOk(callback) {
  return Wonka.map(function (value) {
              if (value.TAG === /* Ok */0) {
                return Curry._1(callback, value._0);
              } else {
                return {
                        TAG: 1,
                        _0: value._0,
                        [Symbol.for("name")]: "Error"
                      };
              }
            });
}

function switchMapOk(callback) {
  return Wonka.switchMap(function (value) {
              if (value.TAG === /* Ok */0) {
                return Curry._1(callback, value._0);
              } else {
                return Wonka.fromValue({
                            TAG: 1,
                            _0: value._0,
                            [Symbol.for("name")]: "Error"
                          });
              }
            });
}

function switchMapOk2(callback) {
  return Wonka.switchMap(function (value) {
              var result2 = value[1];
              var result1 = value[0];
              if (result1.TAG === /* Ok */0) {
                if (result2.TAG === /* Ok */0) {
                  return Curry._1(callback, [
                              result1._0,
                              result2._0
                            ]);
                } else {
                  return Wonka.fromValue({
                              TAG: 1,
                              _0: result2._0,
                              [Symbol.for("name")]: "Error"
                            });
                }
              } else {
                return Wonka.fromValue({
                            TAG: 1,
                            _0: result1._0,
                            [Symbol.for("name")]: "Error"
                          });
              }
            });
}

function shareReplay(bufferSize, source) {
  var state = {
    replaySubject: XWonka_sources$GraphqlPpxXml.makeReplaySubject(bufferSize)
  };
  XWonka_sinks$GraphqlPpxXml.subscribe(state.replaySubject.next)(source);
  return state.replaySubject.source;
}

function tapLogError(message, source) {
  return Wonka.tap(function (value) {
                if (value.TAG === /* Ok */0) {
                  return ;
                }
                console.error(message, value._0);
                
              })(source);
}

function combineArray(sourcesArray) {
  return Belt_Array.reduce(sourcesArray, Wonka.fromValue([]), (function (source, accSource) {
                return Wonka.map(function (value) {
                              return $$Array.append(value[1], [value[0]]);
                            })(Wonka.combine(accSource, source));
              }));
}

function combineList(sourcesList) {
  return Wonka.map($$Array.to_list)(combineArray($$Array.of_list(sourcesList)));
}

var buffer = Wonka_operators.buffer;

var combine = Wonka_operators.combine;

var concatAll = Wonka_operators.concatAll;

var concat = Wonka_operators.concat;

var merge = Wonka_operators.merge;

var mergeAll = Wonka_operators.mergeAll;

var flatten = Wonka_operators.flatten;

var sample = Wonka_operators.sample;

var share = Wonka_operators.share;

var skip = Wonka_operators.skip;

var skipUntil = Wonka_operators.skipUntil;

var skipWhile = Wonka_operators.skipWhile;

var switchAll = Wonka_operators.switchAll;

var take = Wonka_operators.take;

var takeLast = Wonka_operators.takeLast;

var takeUntil = Wonka_operators.takeUntil;

var takeWhile = Wonka_operators.takeWhile;

exports.buffer = buffer;
exports.combine = combine;
exports.concatAll = concatAll;
exports.concat = concat;
exports.merge = merge;
exports.mergeAll = mergeAll;
exports.flatten = flatten;
exports.sample = sample;
exports.share = share;
exports.skip = skip;
exports.skipUntil = skipUntil;
exports.skipWhile = skipWhile;
exports.switchAll = switchAll;
exports.take = take;
exports.takeLast = takeLast;
exports.takeUntil = takeUntil;
exports.takeWhile = takeWhile;
exports.filter = filter;
exports.debounce = debounce;
exports.throttle = throttle;
exports.concatMap = concatMap;
exports.map = map;
exports.tap = tap;
exports.scan = scan;
exports.mergeMap = mergeMap;
exports.switchMap = switchMap;
exports.onPush = onPush;
exports.onEnd = onEnd;
exports.onStart = onStart;
exports.mapOk = mapOk;
exports.switchMapOk = switchMapOk;
exports.switchMapOk2 = switchMapOk2;
exports.shareReplay = shareReplay;
exports.tapLogError = tapLogError;
exports.combineArray = combineArray;
exports.combineList = combineList;
/* Wonka Not a pure module */
