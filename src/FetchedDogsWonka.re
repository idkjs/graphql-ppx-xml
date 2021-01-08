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

[@react.component]
let make = () => {
  let (state, setState) = React.useState(() => LoadingDogs);

  // Notice that instead of `useEffect`, we have `useEffect0`. See
  // reasonml.github.io/reason-react/docs/en/components#hooks for more info
//   let dogsUrl = "https://dog.ceo/api/breeds/image/random/3"
  React.useEffect0(() => {
//       let _=
//   HttpClient.get(~resource=dogsUrl)
//   |> Wonka.map((. result) => {
//       Js.log2("result",result)
//        switch (result) {
//        | HttpClient.Ok(data) => Js.log2("WonkaDogs",data)
//        | HttpClient.Failure
//        | HttpClient.FailureCode(_) => Js.log("Failure")
//        }
//      });
    let request = makeXMLHttpRequest();
    request->addEventListener("load", () => {
      setState(_previousState =>
        LoadedDogs(request->response->parseResponse##message)
      )
    });
    request->addEventListener("error", () => {
      setState(_previousState => ErrorFetchingDogs)
    });
    request->open_("GET", DogsUrl.url);
    request->send;

    // the return value is called by React's useEffect when the component unmounts
    Some(() => {request->abort});
  });
  React.useEffect0(() => {
      let x =
  HttpClient.get(~resource=DogsUrl.url)
  |> Wonka.map((. result) => {
      Js.log2("result",result)
       switch (result) {
       | HttpClient.Ok(data) => Js.log2("WonkaDogs",data)
       | HttpClient.Failure
       | HttpClient.FailureCode(_) => Js.log("Failure")
       }
     });
x|>Js.log

    // the return value is called by React's useEffect when the component unmounts
    Some(() =>());
  });

  <div
    style={ReactDOMRe.Style.make(
      ~height="120px",
      ~display="flex",
      ~alignItems="center",
      ~justifyContent="center",
      (),
    )}>
    {switch (state) {
     | ErrorFetchingDogs => React.string("An error occurred!")
     | LoadingDogs => React.string("Loading...")
     | LoadedDogs(dogs) =>
       dogs
       ->Belt.Array.mapWithIndex((i, dog) => {
           let imageStyle =
             ReactDOMRe.Style.make(
               ~height="120px",
               ~width="100%",
               ~marginRight=i === Js.Array.length(dogs) - 1 ? "0px" : "8px",
               ~borderRadius="8px",
               ~boxShadow="0px 4px 16px rgb(200, 200, 200)",
               ~backgroundSize="cover",
               ~backgroundImage={j|url($dog)|j},
               ~backgroundPosition="center",
               (),
             );
           <div key=dog style=imageStyle />;
         })
       ->React.array
     }}
  </div>;
};
