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
let makeErrorJson = err => {
  let error = Js.String.make(err);
  let json = Js.Dict.empty();
  Js.Dict.set(json, "error", Js.Json.string(error));
  Js.Json.object_(json);
};
type decoder = Js.Json.t => EpicReducer.Query.t_user;
let decoder = (response: Js.Json.t) => {
  let data = Obj.magic(response)##data;

  let typedResponse = Query.unsafe_fromJson(data);
  let parsedData = Query.parse(typedResponse);
  let username =
    switch (parsedData) {
    | {user: Some({username})} => username
    | _ => Some("Anonymous")
    };
  let id =
    switch (parsedData) {
    | {user: Some({id})} => id
    | _ => None
    };
  let email =
    switch (parsedData) {
    | {user: Some({email})} => email
    | _ => None
    };
  let phone =
    switch (parsedData) {
    | {user: Some({phone})} => phone
    | _ => None
    };
  let website =
    switch (parsedData) {
    | {user: Some({website})} => website
    | _ => None
    };
  let user: Query.t_user = {username, id, email, phone, website};

  user;
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
external parseResponse: response => {. "message": array(string)} = "parse";
[@bs.scope "JSON"] [@bs.val]
external parseError: response => {. "message": string} = "parse";
[@bs.scope "JSON"] [@bs.val] external parseData: response => decoder = "parse";

// ================ real parallel example to that linked file now

// we can use the query string because we are using `application/graphql` as content type.
let qs = API.gql ++ Query.query; // ++ "sss";
Js.log(qs);
type state =
  | LoadingDogs
  | ErrorFetchingDogs
  | LoadedDogs(Query.t_user);

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
        LoadedDogs(request->response->parseData->Decode.data)
      )
    });
    request->addEventListener("error", () => {
      let error = request->response->parseError;
      Js.log2("An error occurred!", error);
      setState(_previousState => ErrorFetchingDogs);
    });
    request->open_("Post", qs);
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
     | LoadedDogs(user) =>
       //  Js.log2("user", user);
       switch (user.username) {
       | Some(name) => React.string(name)
       | None => React.string("Anonymous")
       }
     }}
  </div>;
};
