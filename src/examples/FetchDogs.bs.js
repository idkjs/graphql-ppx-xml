'use strict';


var request = new XMLHttpRequest();

request.addEventListener("load", (function (param) {
        console.log(JSON.parse(request.response).message);
        
      }));

request.addEventListener("error", (function (param) {
        console.log(/* ErrorFetchingDogs */1);
        
      }));

request.open("GET", "https://dog.ceo/api/breeds/image/random/3");

request.send();

exports.request = request;
/* request Not a pure module */
