// https://twitter.com/reasonml/status/1238026671581622272?s=20
// https://gist.github.com/chenglou/b6cf738a5d7adbde2ee008eb93117b49
// This is a proper alternative to
// https://github.com/BuckleScript/bucklescript/blob/b9508105b1a35537bdea9a1fabd10f6c65f776b4/jscomp/bsb/templates/react-hooks/src/FetchedDogPictures/FetchedDogPictures.re#L14
// The one in that file uses Promise, but that's *wrong*.
// We only used promise as a demo of its API. We'll remove it soon.

// As you can see below, the pure XMLHttpRequest code is just as clean,
// less mysterious for all, more performant, extensible, and actually correct.

// Ignore these externals for now. They're just for illustration
// purposes. I just copy pasted the Js code from
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
// and translated it to Reason

// function reqListener () {
//   console.log(this.responseText);
// }

// var oReq = new XMLHttpRequest();
// oReq.addEventListener("load", reqListener);
// oReq.open("GET", "http://www.example.org/example.txt");
// oReq.send();
type request;
type response;
[@bs.new] external makeXMLHttpRequest: unit => request = "XMLHttpRequest";
[@bs.send]
external addEventListener: (request, string, unit => unit) => unit =
  "addEventListener";
[@bs.get] external response: request => response = "response";
[@bs.send] external open_: (request, string, string) => unit = "open";
[@bs.send] external send: request => unit = "send";
[@bs.send] external abort: request => unit = "abort";

[@bs.scope "JSON"] [@bs.val]
external parseResponse: response => {. "message": array(string)} = "parse";

// ================ real parallel example to that linked file now

type state =
  | LoadingDogs
  | ErrorFetchingDogs
  | LoadedDogs(array(string));

let request = makeXMLHttpRequest();
request->addEventListener("load", () => {
  Js.log(request->response->parseResponse##message)
});
request->addEventListener("error", () => {Js.log(ErrorFetchingDogs)});
request->open_("GET", "https://dog.ceo/api/breeds/image/random/3");
request->send;

// the return value is called by React's useEffect when the component unmounts
//     Some(() => {request->abort});
//   });
