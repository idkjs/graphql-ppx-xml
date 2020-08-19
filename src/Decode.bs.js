'use strict';

var Query$EpicReducer = require("./Query.bs.js");

function data(response) {
  console.log("response", response);
  var data$1 = response.data;
  console.log("(response)##data", data$1);
  console.log("typedResponse", data$1);
  var parsedData = Query$EpicReducer.parse(data$1);
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
  var user = {
    id: id,
    username: username,
    email: email,
    phone: phone,
    website: website
  };
  console.log("user's id is: ", id);
  console.log("user is: ", user);
  return user;
}

exports.data = data;
/* No side effect */
