'use strict';

var Wonka = require("wonka/src/Wonka.bs.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var HttpClient$GraphqlPpxXml = require("./Wonka/HttpClient.bs.js");

((require('isomorphic-fetch')));

function parseDogsResponseJson(json) {
  return {
          message: Json_decode.field("message", (function (param) {
                  return Json_decode.array(Json_decode.string, param);
                }), json),
          status: Json_decode.field("status", Json_decode.$$int, json)
        };
}

var DecodeDogs = {
  parseDogsResponseJson: parseDogsResponseJson
};

var dogsUrl = "https://dog.ceo/api/breeds/image/random/3";

function extractMessageFrom($$event) {
  console.log("messages_event_body", $$event.body.message);
  console.log("messages", $$event);
  return $$event;
}

function mapToMessage(messagesJs) {
  console.log("data##body", messagesJs.response);
  return messagesJs.body.message;
}

function handleMsg(json) {
  console.log("JSON", json);
  console.log(mapToMessage(json));
  
}

var data = fetch(dogsUrl);

console.log("result", data);

Wonka.map(function (result) {
        console.log("result", result);
        if (typeof result === "number") {
          console.log("Failure");
          return ;
        }
        if (result.TAG === /* Ok */0) {
          console.log(result._0);
          return ;
        }
        console.log("Failure");
        
      })(HttpClient$GraphqlPpxXml.get(dogsUrl));

exports.DecodeDogs = DecodeDogs;
exports.dogsUrl = dogsUrl;
exports.extractMessageFrom = extractMessageFrom;
exports.mapToMessage = mapToMessage;
exports.handleMsg = handleMsg;
exports.data = data;
/*  Not a pure module */
