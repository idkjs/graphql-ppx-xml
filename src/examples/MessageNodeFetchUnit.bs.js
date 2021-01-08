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

function getDogsUnit(param) {
  return NodeFetch("https://dog.ceo/api/breeds/image/random/3").then(function (response) {
                  return response.json();
                }).then(function (jsonResponse) {
                return Promise.resolve(jsonResponse.message);
              }).catch(function (err) {
              return Promise.resolve(makeErrorJson(err));
            });
}

function mapToMessage(messagesJs) {
  return messagesJs.message;
}

function handleMsg(json) {
  console.log(json.message);
  
}

Wonka.subscribe(function (messages) {
        console.log(messages);
        
      })(Wonka.fromPromise(getDogs(undefined)));

exports.makeErrorJson = makeErrorJson;
exports.getDogs = getDogs;
exports.getDogsUnit = getDogsUnit;
exports.mapToMessage = mapToMessage;
exports.handleMsg = handleMsg;
/*  Not a pure module */
