'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Wonka = require("wonka/src/Wonka.bs.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var DogsUrl$GraphqlPpxXml = require("./Wonka/DogsUrl.bs.js");
var HttpClient$GraphqlPpxXml = require("./Wonka/HttpClient.bs.js");

function FetchedDogsWonka(Props) {
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
                                        _0: JSON.parse(request.response).message,
                                        [Symbol.for("name")]: "LoadedDogs"
                                      };
                              }));
                }));
          request.addEventListener("error", (function (param) {
                  return Curry._1(setState, (function (_previousState) {
                                return /* ErrorFetchingDogs */1;
                              }));
                }));
          request.open("GET", DogsUrl$GraphqlPpxXml.url);
          request.send();
          return (function (param) {
                    request.abort();
                    
                  });
        }), []);
  React.useEffect((function () {
          var x = Wonka.map(function (result) {
                  console.log("result", result);
                  if (typeof result === "number") {
                    console.log("Failure");
                    return ;
                  }
                  if (result.TAG === /* Ok */0) {
                    console.log("WonkaDogs", result._0);
                    return ;
                  }
                  console.log("Failure");
                  
                })(HttpClient$GraphqlPpxXml.get(DogsUrl$GraphqlPpxXml.url));
          console.log(x);
          return (function (param) {
                    
                  });
        }), []);
  var tmp;
  if (typeof state === "number") {
    tmp = state !== 0 ? "An error occurred!" : "Loading...";
  } else {
    var dogs = state._0;
    tmp = Belt_Array.mapWithIndex(dogs, (function (i, dog) {
            var imageStyle = {
              backgroundImage: "url(" + dog + ")",
              backgroundPosition: "center",
              height: "120px",
              marginRight: i === (dogs.length - 1 | 0) ? "0px" : "8px",
              width: "100%",
              backgroundSize: "cover",
              borderRadius: "8px",
              boxShadow: "0px 4px 16px rgb(200, 200, 200)"
            };
            return React.createElement("div", {
                        key: dog,
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

var make = FetchedDogsWonka;

exports.make = make;
/* Wonka Not a pure module */
