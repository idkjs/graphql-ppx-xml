'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

var Raw = {};

var query = "query   {\ndogs  {\nimageUrl  \n}\n\n}\n";

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

var Query = {
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

function decoder(response) {
  var data = response.data;
  return parse(data).dogs;
}

var endpoint = "https://formidadog-ql.netlify.app/graphql?query=";

var querystring = "https://formidadog-ql.netlify.app/graphql?query=query   {\ndogs  {\nimageUrl  \n}\n\n}\n";

var imageStyle = {
  backgroundPosition: "center",
  height: "120px",
  width: "100%",
  backgroundSize: "cover",
  borderRadius: "8px",
  boxShadow: "0px 4px 16px rgb(200, 200, 200)"
};

function FetchDogsGraphql(Props) {
  var match = React.useState(function () {
        return /* LoadingDogs */0;
      });
  var setState = match[1];
  var state = match[0];
  React.useEffect((function () {
          var request = new XMLHttpRequest();
          request.addEventListener("load", (function (param) {
                  return Curry._1(setState, (function (_previousState) {
                                return {
                                        _0: decoder(JSON.parse(request.response)),
                                        [Symbol.for("name")]: "LoadedDogs"
                                      };
                              }));
                }));
          request.addEventListener("error", (function (param) {
                  var error = JSON.parse(request.response);
                  console.log("An error occurred!", error);
                  return Curry._1(setState, (function (_previousState) {
                                return /* ErrorFetchingDogs */1;
                              }));
                }));
          request.open("Post", querystring);
          request.send();
          return (function (param) {
                    request.abort();
                    
                  });
        }), []);
  var tmp;
  if (typeof state === "number") {
    tmp = state !== 0 ? "An error occurred!" : "Loading...";
  } else {
    var dogs = state._0;
    tmp = Belt_Array.mapWithIndex(dogs.slice(0, 3), (function (i, dog) {
            var dog$1 = dog.imageUrl;
            var imageStyle = {
              backgroundImage: "url(" + dog$1 + ")",
              backgroundPosition: "center",
              height: "120px",
              marginRight: i === (dogs.length - 1 | 0) ? "0px" : "8px",
              width: "100%",
              backgroundSize: "cover",
              borderRadius: "8px",
              boxShadow: "0px 4px 16px rgb(200, 200, 200)"
            };
            return React.createElement("div", {
                        key: dog$1,
                        style: imageStyle
                      });
          }));
  }
  return React.createElement("div", {
              style: {
                display: "flex",
                height: "120px",
                alignItems: "center",
                justifyContent: "center"
              }
            }, tmp);
}

var make = FetchDogsGraphql;

exports.Query = Query;
exports.makeErrorJson = makeErrorJson;
exports.decoder = decoder;
exports.endpoint = endpoint;
exports.querystring = querystring;
exports.imageStyle = imageStyle;
exports.make = make;
/* react Not a pure module */
