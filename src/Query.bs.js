'use strict';


var Raw = {};

function parse(value) {
  var value$1 = value.user;
  var tmp;
  if (value$1 == null) {
    tmp = undefined;
  } else {
    var value$2 = value$1.id;
    var value$3 = value$1.username;
    var value$4 = value$1.email;
    var value$5 = value$1.phone;
    var value$6 = value$1.website;
    tmp = {
      id: !(value$2 == null) ? value$2 : undefined,
      username: !(value$3 == null) ? value$3 : undefined,
      email: !(value$4 == null) ? value$4 : undefined,
      phone: !(value$5 == null) ? value$5 : undefined,
      website: !(value$6 == null) ? value$6 : undefined
    };
  }
  return {
          user: tmp
        };
}

function serialize(value) {
  var value$1 = value.user;
  var user;
  if (value$1 !== undefined) {
    var value$2 = value$1.website;
    var website = value$2 !== undefined ? value$2 : null;
    var value$3 = value$1.phone;
    var phone = value$3 !== undefined ? value$3 : null;
    var value$4 = value$1.email;
    var email = value$4 !== undefined ? value$4 : null;
    var value$5 = value$1.username;
    var username = value$5 !== undefined ? value$5 : null;
    var value$6 = value$1.id;
    var id = value$6 !== undefined ? value$6 : null;
    user = {
      id: id,
      username: username,
      email: email,
      phone: phone,
      website: website
    };
  } else {
    user = null;
  }
  return {
          user: user
        };
}

function serializeVariables(param) {
  
}

function makeVariables(param) {
  
}

function makeDefaultVariables(param) {
  
}

var query = "query   {\nuser(id: 1)  {\nid  \nusername  \nemail  \nphone  \nwebsite  \n}\n\n}\n";

exports.Raw = Raw;
exports.query = query;
exports.parse = parse;
exports.serialize = serialize;
exports.serializeVariables = serializeVariables;
exports.makeVariables = makeVariables;
exports.makeDefaultVariables = makeDefaultVariables;
/* No side effect */
