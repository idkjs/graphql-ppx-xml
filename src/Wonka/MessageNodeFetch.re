type message = {
  message: array(string),
  status: int,
};

[@bs.module] external fetch: string => Js.Promise.t('a) = "node-fetch";

open Js.Promise;
let makeErrorJson = (err) => {
  let error = Js.String.make(err)
  let json = Js.Dict.empty();
  Js.Dict.set(json, error, Js.Json.boolean(true));
  Js.Json.object_(json);
};
let getDogs = (): Js.Promise.t(Js.Json.t) =>
  fetch("https://dog.ceo/api/breeds/image/random/3")
  |> then_(response => response##json())
  |> then_(jsonResponse => {
       let message = jsonResponse##message;

       Js.Promise.resolve(message);
     })
  |> catch(err => {
       let error = makeErrorJson(err);

       Js.Promise.resolve(error);
     });


Wonka.fromPromise(getDogs()) |> Wonka.subscribe((. messages) => Js.log(messages))|>ignore;
