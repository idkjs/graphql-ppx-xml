'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Fetch = require("bs-fetch/src/Fetch.bs.js");
var Wonka = require("wonka/src/Wonka.bs.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Js_mapperRt = require("bs-platform/lib/js/js_mapperRt.js");
var XWonka$GraphqlPpxXml = require("../XWonka/XWonka.bs.js");

((require('node-fetch')));

var jsMapperConstantArray = [
  200,
  201,
  202,
  203,
  204,
  205,
  206,
  207,
  208,
  226,
  300,
  301,
  302,
  303,
  304,
  305,
  306,
  307,
  308,
  400,
  401,
  402,
  403,
  404,
  405,
  406,
  407,
  408,
  409,
  410,
  411,
  412,
  413,
  414,
  415,
  416,
  417,
  418,
  421,
  422,
  423,
  424,
  426,
  428,
  429,
  431,
  451,
  500,
  501,
  502,
  503,
  504,
  505,
  506,
  507,
  508,
  510,
  511
];

function tToJs(param) {
  return jsMapperConstantArray[param];
}

function tFromJs(param) {
  return Js_mapperRt.fromInt(58, jsMapperConstantArray, param);
}

var StatusCode = {
  tToJs: tToJs,
  tFromJs: tFromJs,
  fromInt: tFromJs,
  toInt: tToJs
};

function fetchWrapper(resource, requestInit) {
  var cancelled = {
    contents: false
  };
  return Wonka.make(function (observer) {
              var observerNext = function (value) {
                if (!cancelled.contents) {
                  return Curry._1(observer.next, value);
                }
                
              };
              var observerComplete = function (param) {
                if (!cancelled.contents) {
                  return Curry._1(observer.complete, undefined);
                }
                
              };
              fetch(resource, requestInit).then(function (res) {
                      if (res.ok) {
                        observerNext({
                              TAG: 0,
                              _0: res,
                              [Symbol.for("name")]: "Ok"
                            });
                      } else {
                        var __x = Js_mapperRt.fromInt(58, jsMapperConstantArray, res.status);
                        observerNext(Belt_Option.getWithDefault(Belt_Option.map(__x, (function (code) {
                                        return {
                                                TAG: 1,
                                                _0: code,
                                                [Symbol.for("name")]: "FailureCode"
                                              };
                                      })), /* Failure */0));
                      }
                      observerComplete(undefined);
                      return Promise.resolve(undefined);
                    }).catch(function (error) {
                    console.log(error);
                    observerNext(/* Failure */0);
                    observerComplete(undefined);
                    return Promise.resolve(undefined);
                  });
              return function () {
                cancelled.contents = true;
                
              };
            });
}

function get(resource) {
  var requestInit = Fetch.RequestInit.make(/* Get */0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(undefined);
  return fetchWrapper(resource, requestInit);
}

function baseConverter(converter, result) {
  if (typeof result === "number") {
    return XWonka$GraphqlPpxXml.fromValue(/* Failure */0);
  } else if (result.TAG === /* Ok */0) {
    return XWonka$GraphqlPpxXml.map(function (value) {
                  return {
                          TAG: 0,
                          _0: value,
                          [Symbol.for("name")]: "Ok"
                        };
                })(XWonka$GraphqlPpxXml.fromPromise(Curry._1(converter, result._0)));
  } else {
    return XWonka$GraphqlPpxXml.fromValue({
                TAG: 1,
                _0: result._0,
                [Symbol.for("name")]: "FailureCode"
              });
  }
}

function toJson(param) {
  return baseConverter((function (prim) {
                return prim.json();
              }), param);
}

exports.StatusCode = StatusCode;
exports.fetchWrapper = fetchWrapper;
exports.get = get;
exports.baseConverter = baseConverter;
exports.toJson = toJson;
/*  Not a pure module */
