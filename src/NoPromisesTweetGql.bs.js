'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var API$EpicReducer = require("./API.bs.js");
var Query$EpicReducer = require("./Query.bs.js");
var Decode$EpicReducer = require("./Decode.bs.js");

function makeErrorJson(err) {
  var error = String(err);
  var json = {};
  json["error"] = error;
  return json;
}

function decoder(response) {
  var data = response.data;
  var parsedData = Query$EpicReducer.parse(data);
  var match = parsedData.user;
  var username = match !== undefined ? match.username : "Anonymous";
  var match$1 = parsedData.user;
  var id = match$1 !== undefined ? match$1.id : undefined;
  var match$2 = parsedData.user;
  var email = match$2 !== undefined ? match$2.email : undefined;
  var match$3 = parsedData.user;
  var phone = match$3 !== undefined ? match$3.phone : undefined;
  var match$4 = parsedData.user;
  var website = match$4 !== undefined ? match$4.website : undefined;
  return {
          id: id,
          username: username,
          email: email,
          phone: phone,
          website: website
        };
}

var qs = API$EpicReducer.gql + Query$EpicReducer.query;

console.log(qs);

var imageStyle = {
  backgroundPosition: "center",
  height: "120px",
  width: "100%",
  backgroundSize: "cover",
  borderRadius: "8px",
  boxShadow: "0px 4px 16px rgb(200, 200, 200)"
};

function NoPromisesTweetGql(Props) {
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
                                        _0: Decode$EpicReducer.data(JSON.parse(request.response)),
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
          request.open("Post", qs);
          request.send();
          return (function (param) {
                    request.abort();
                    
                  });
        }), []);
  var tmp;
  if (typeof state === "number") {
    tmp = state !== 0 ? "An error occurred!" : "Loading...";
  } else {
    var name = state._0.username;
    tmp = name !== undefined ? name : "Anonymous";
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

var make = NoPromisesTweetGql;

exports.makeErrorJson = makeErrorJson;
exports.decoder = decoder;
exports.qs = qs;
exports.imageStyle = imageStyle;
exports.make = make;
/*  Not a pure module */
