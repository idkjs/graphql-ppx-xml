'use strict';

var Query$GraphqlPpxXml = require("./Query.bs.js");

function data(response) {
  console.log("response", response);
  var data$1 = response.data;
  console.log("(response)##data", data$1);
  console.log("typedResponse", data$1);
  var dogs = Query$GraphqlPpxXml.parse(data$1).dogs;
  console.log("dogs: ", dogs);
  return dogs;
}

exports.data = data;
/* No side effect */
