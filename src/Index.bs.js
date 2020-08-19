'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var ExampleStyles$EpicReducer = require("./ExampleStyles.bs.js");
var NoPromisesTweet$EpicReducer = require("./NoPromisesTweet.bs.js");
var NoPromisesTweetGql$EpicReducer = require("./NoPromisesTweetGql.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$EpicReducer.style;

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

ReactDom.render(React.createElement(NoPromisesTweetGql$EpicReducer.make, {}), makeContainer("NoPromisesTweetGql"));

ReactDom.render(React.createElement(NoPromisesTweet$EpicReducer.make, {}), makeContainer("NoPromisesTweet Dog Pictures"));

exports.style = style;
exports.makeContainer = makeContainer;
/* style Not a pure module */
