'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Query$GraphqlPpxXml = require("./Query.bs.js");
var Decode$GraphqlPpxXml = require("./Decode.bs.js");

function makeErrorJson(err) {
  var error = String(err);
  var json = {};
  json["error"] = error;
  return json;
}

function decoder(response) {
  var data = response.data;
  return Query$GraphqlPpxXml.parse(data).dogs;
}

var endpoint = "https://formidadog-ql.netlify.app/graphql?query=";

var querystring = endpoint + Query$GraphqlPpxXml.query;

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
                                        _0: Decode$GraphqlPpxXml.data(JSON.parse(request.response)),
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

exports.makeErrorJson = makeErrorJson;
exports.decoder = decoder;
exports.endpoint = endpoint;
exports.querystring = querystring;
exports.imageStyle = imageStyle;
exports.make = make;
/* react Not a pure module */
