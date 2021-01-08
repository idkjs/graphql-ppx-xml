'use strict';

var Wonka = require("wonka/src/Wonka.bs.js");
var NodeFetch = require("node-fetch");

function makeErrorJson(err) {
  var error = String(err);
  var json = {};
  json[error] = true;
  return json;
}

function getDogs(param) {
  return NodeFetch("https://dog.ceo/api/breeds/image/random/3").then(function (response) {
                  return response.json();
                }).then(function (jsonResponse) {
                return Promise.resolve(jsonResponse.message);
              }).catch(function (err) {
              return Promise.resolve(makeErrorJson(err));
            });
}

Wonka.subscribe(function (messages) {
        console.log(messages);
        
      })(Wonka.fromPromise(getDogs(undefined)));

exports.makeErrorJson = makeErrorJson;
exports.getDogs = getDogs;
/*  Not a pure module */
