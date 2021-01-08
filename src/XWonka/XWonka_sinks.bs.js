'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonka = require("wonka/src/Wonka.bs.js");
var Wonka_sinks = require("wonka/src/Wonka_sinks.bs.js");

function subscribe(callback) {
  return Wonka.subscribe(Curry.__1(callback));
}

var forEach = Wonka_sinks.forEach;

var publish = Wonka_sinks.publish;

var toArray = Wonka_sinks.toArray;

exports.forEach = forEach;
exports.publish = publish;
exports.toArray = toArray;
exports.subscribe = subscribe;
/* Wonka Not a pure module */
