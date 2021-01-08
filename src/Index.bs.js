'use strict';

var Warp = require("@space-labs/warp/src/Warp.bs.js");
var React = require("react");
var ReactDom = require("react-dom");
var Warp_Event = require("@space-labs/warp/src/Warp/Warp_Event.bs.js");
var Warp_Method = require("@space-labs/warp/src/Warp/Warp_Method.bs.js");
var DogsUrl$GraphqlPpxXml = require("./Wonka/DogsUrl.bs.js");
var ExampleStyles$GraphqlPpxXml = require("./ExampleStyles.bs.js");
var FetchDogsGraphql$GraphqlPpxXml = require("./FetchDogsGraphql.bs.js");
var FetchedDogsWonka$GraphqlPpxXml = require("./FetchedDogsWonka.bs.js");
var FetchedDogsNoPromises$GraphqlPpxXml = require("./FetchedDogsNoPromises.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$GraphqlPpxXml.style;

function makeContainer(text) {
  var container = document.createElement("div");
  container.className = "container";
  var title = document.createElement("div");
  title.className = "containerTitle";
  title.innerText = text;
  var content = document.createElement("div");
  content.className = "containerContent";
  container.appendChild(title);
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

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

ReactDom.render(React.createElement(FetchDogsGraphql$GraphqlPpxXml.make, {}), makeContainer("https://formidadog-ql.netlify.app/graphql"));

ReactDom.render(React.createElement(FetchedDogsNoPromises$GraphqlPpxXml.make, {}), makeContainer("Dog Pictures Without Promises"));

ReactDom.render(React.createElement(FetchedDogsWonka$GraphqlPpxXml.make, {}), makeContainer("Dog Pictures With Wonka"));

exports.style = style;
exports.makeContainer = makeContainer;
/* style Not a pure module */
