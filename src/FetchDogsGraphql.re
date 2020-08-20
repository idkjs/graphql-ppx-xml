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

// dependencies
// [`@reasonml-community/graphql-ppx`](https://beta.graphql-ppx.com/docs/getting-started)
module Query = {
[%graphql
  {|
    {
      dogs {
        imageUrl
      }
    }
|}
];

}
let makeErrorJson = err => {
  let error = Js.String.make(err);
  let json = Js.Dict.empty();
  Js.Dict.set(json, "error", Js.Json.string(error));
  Js.Json.object_(json);
};
type dogs = array(Query.t_dogs);
type decoder = Js.Json.t => dogs;
let decoder = (response) => {
  // get data object off of response
  let data = Obj.magic(response)##data;

  let typedDogs: Query.Raw.t = Query.unsafe_fromJson(data);
  let dogs = Query.parse(typedDogs).dogs;

  dogs;
};
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
external parseError: response => {. "message": string} = "parse";
[@bs.scope "JSON"] [@bs.val] external parseData: response => decoder = "parse";

// ================ real parallel example to that linked file now
let endpoint = "https://formidadog-ql.netlify.app/graphql?query=";
// we can use the query string because we are using `application/graphql` as content type.
let querystring = endpoint ++ Query.query; // ++ "sss";

type state =
  | LoadingDogs
  | ErrorFetchingDogs
  | LoadedDogs(dogs);

let imageStyle =
  ReactDOMRe.Style.make(
    ~height="120px",
    ~width="100%",
    ~borderRadius="8px",
    ~boxShadow="0px 4px 16px rgb(200, 200, 200)",
    ~backgroundSize="cover",
    ~backgroundPosition="center",
    (),
  );
[@react.component]
let make = () => {
  let (state, setState) = React.useState(() => LoadingDogs);

  // Notice that instead of `useEffect`, we have `useEffect0`. See
  // reasonml.github.io/reason-react/docs/en/components#hooks for more info
  React.useEffect0(() => {
    let request = makeXMLHttpRequest();
    request->addEventListener("load", () => {
      setState(_previousState =>
        LoadedDogs(request->response->parseData->decoder)
      )
    });
    request->addEventListener("error", () => {
      let error = request->response->parseError;
      Js.log2("An error occurred!", error);
      setState(_previousState => ErrorFetchingDogs);
    });
    request->open_("Post", querystring);
    request->send;

    // the return value is called by React's useEffect when the component unmounts
    Some(() => {request->abort});
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
      //  this API doesn't let you limit number of dogs so we are getting the first 3
       Js.Array.slice(~start=0,~end_= 3,dogs)
       ->Belt.Array.mapWithIndex((i, dog) => {
           let dog = dog.imageUrl;
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
       ->React.array;
     }}
  </div>;
};
