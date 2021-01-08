'use strict';

var NodeFetch = require("node-fetch").default;
var BsNodeFetch = require("bs-node-fetch/src/BsNodeFetch.bs.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");

function unwrapUnsafely(v) {
  if (v !== undefined) {
    return Caml_option.valFromOption(v);
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "unwrapUnsafely called on None",
        Error: new Error()
      };
}

var $$Option = {
  unwrapUnsafely: unwrapUnsafely
};

NodeFetch("https://dog.ceo/api/breeds/list/all").then(function (prim) {
        return prim.text();
      }).then(function (text) {
      return Promise.resolve((console.log(text), undefined));
    });

NodeFetch("https://dog.ceo/api/breeds/list/all", BsNodeFetch.RequestInit.make(/* Post */2, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(undefined)).then(function (prim) {
        return prim.text();
      }).then(function (text) {
      return Promise.resolve((console.log(text), undefined));
    });

exports.$$Option = $$Option;
/*  Not a pure module */
