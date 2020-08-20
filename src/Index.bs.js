'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var ExampleStyles$GraphqlPpxXml = require("./ExampleStyles.bs.js");
var NoPromisesTweet$GraphqlPpxXml = require("./NoPromisesTweet.bs.js");
var FetchDogsGraphql$GraphqlPpxXml = require("./FetchDogsGraphql.bs.js");

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

ReactDom.render(React.createElement(FetchDogsGraphql$GraphqlPpxXml.make, {}), makeContainer("https://formidadog-ql.netlify.app/graphql"));

ReactDom.render(React.createElement(NoPromisesTweet$GraphqlPpxXml.make, {}), makeContainer("Dog Pictures Without Promises"));

exports.style = style;
exports.makeContainer = makeContainer;
/* style Not a pure module */
