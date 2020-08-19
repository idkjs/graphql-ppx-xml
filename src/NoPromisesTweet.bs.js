'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

function NoPromisesTweet(Props) {
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
          request.open("GET", "https://dog.ceo/api/breeds/image/random/3");
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

var make = NoPromisesTweet;

exports.make = make;
/* react Not a pure module */
