'use strict';


var Raw = {};

function parse(value) {
  var value$1 = value.dogs;
  return {
          dogs: value$1.map(function (value) {
                return {
                        imageUrl: value.imageUrl
                      };
              })
        };
}

function serialize(value) {
  var value$1 = value.dogs;
  var dogs = value$1.map(function (value) {
        var value$1 = value.imageUrl;
        return {
                imageUrl: value$1
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

var query = "query   {\ndogs  {\nimageUrl  \n}\n\n}\n";

exports.Raw = Raw;
exports.query = query;
exports.parse = parse;
exports.serialize = serialize;
exports.serializeVariables = serializeVariables;
exports.makeVariables = makeVariables;
exports.makeDefaultVariables = makeDefaultVariables;
/* No side effect */
