'use strict';

var Warp = require("@space-labs/warp/src/Warp.bs.js");
var Warp_Event = require("@space-labs/warp/src/Warp/Warp_Event.bs.js");
var Warp_Method = require("@space-labs/warp/src/Warp/Warp_Method.bs.js");
var DogsUrl$GraphqlPpxXml = require("../Wonka/DogsUrl.bs.js");

Warp.send(Warp_Event.onLoad(Warp_Method.get(DogsUrl$GraphqlPpxXml.url), (function (response) {
            if (response.TAG === /* Ok */0) {
              var data = response._0;
              if (data !== undefined) {
                console.log(data);
              } else {
                console.info("No Response!");
              }
              return ;
            }
            console.error(response._0);
            
          })));

/*  Not a pure module */
