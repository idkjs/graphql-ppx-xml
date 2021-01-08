[%raw "require('isomorphic-fetch')"];
open Fetch;

module GetAllDogs = [%graphql
  {|
  query dogs {
    dogs {
      name
      breed
      likes
    }
  }
|}
];

// type resultType = GetAllDogs.t;

[@bs.val]
external jsonStringify: ('a, Js.Nullable.t(unit), int) => string =
  "JSON.stringify";
let makeErrorJson = err => {
  let error = Js.String.make(err);
  let json = Js.Dict.empty();
  Js.Dict.set(json, "error", Js.Json.string(error));
  Js.Json.object_(json);
};
let getDogs = query => {
  Js.Promise.

    (
      fetchWithInit(
        DogsUrl.url,
        RequestInit.make(
          ~method_=Post,
          ~headers=HeadersInit.make({"Content-Type": "application/graphql"}),
          ~body=BodyInit.make(query),
          (),
        ),
      )
      |> then_(Response.json)
      |> catch(err => {
           let error = makeErrorJson(err);

           Js.Promise.resolve(error);
         })
    );
};

let _ =
  Wonka.fromPromise(getDogs(GetAllDogs.query))
  |> Wonka.subscribe((. dogs) => Js.log2("dogs", jsonStringify(dogs)));
