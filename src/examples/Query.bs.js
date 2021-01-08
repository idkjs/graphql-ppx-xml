'use strict';

var Fetch = require("bs-fetch/src/Fetch.bs.js");
var Wonka = require("wonka/src/Wonka.bs.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var DogsUrl$GraphqlPpxXml = require("../Wonka/DogsUrl.bs.js");

((require('isomorphic-fetch')));

var Raw = {};

var query = "query dogs  {\ndogs  {\nname  \nbreed  \nlikes  \n}\n\n}\n";

function parse(value) {
  var value$1 = value.dogs;
  return {
          dogs: value$1.map(function (value) {
                return {
                        name: value.name,
                        breed: value.breed,
                        likes: value.likes
                      };
              })
        };
}

function serialize(value) {
  var value$1 = value.dogs;
  var dogs = value$1.map(function (value) {
        var value$1 = value.likes;
        var value$2 = value.breed;
        var value$3 = value.name;
        return {
                name: value$3,
                breed: value$2,
                likes: value$1
              };
      });
  return {
          dogs: dogs
        };
}

function serializeVariables(param) {
  
}

function makeVariables(param) {
  
}

function makeDefaultVariables(param) {
  
}

var GetAllDogs = {
  Raw: Raw,
  query: query,
  parse: parse,
  serialize: serialize,
  serializeVariables: serializeVariables,
  makeVariables: makeVariables,
  makeDefaultVariables: makeDefaultVariables
};

function makeErrorJson(err) {
  var error = String(err);
  var json = {};
  json["error"] = error;
  return json;
}

function getDogs(query) {
  return fetch(DogsUrl$GraphqlPpxXml.url, Fetch.RequestInit.make(/* Post */2, {
                        "Content-Type": "application/graphql"
                      }, Caml_option.some(query), undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(undefined)).then(function (prim) {
                return prim.json();
              }).catch(function (err) {
              return Promise.resolve(makeErrorJson(err));
            });
}

Wonka.subscribe(function (dogs) {
        console.log("dogs", (function (param, param$1) {
                return JSON.stringify(dogs, param, param$1);
              }));
        
      })(Wonka.fromPromise(getDogs(query)));

exports.GetAllDogs = GetAllDogs;
exports.makeErrorJson = makeErrorJson;
exports.getDogs = getDogs;
/*  Not a pure module */
