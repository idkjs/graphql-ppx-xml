// type response;
// [@bs.new] external makeXMLHttpRequest: unit => request = "XMLHttpRequest";
// [@bs.send]
// external addEventListener: (request, string, unit => unit) => unit =
//   "addEventListener";
// [@bs.get] external response: request => response = "response";
// [@bs.send] external open_: (request, string, string) => unit = "open";
// [@bs.send] external send: request => unit = "send";
// [@bs.send] external abort: request => unit = "abort";
[%raw "require('isomorphic-fetch')"];
type dogs = {
  message: array(string),
  status: int,
};
module DecodeDogs = {
  let parseDogsResponseJson = (json): dogs =>
    Json.Decode.{
      message: json |> field("message", Json.Decode.array(string)),
      status: field("status", int, json),
    };
};
let dogsUrl = "https://dog.ceo/api/breeds/image/random/3";
let extractMessageFrom = event => {
  /* use Obj.magic to change type, otherwise code in Wonka.subscribe breaks. */
  let event = event->Obj.magic;
  Js.log2("messages_event_body", event##body##message);
  // let messages = handleRepos(event)
  /* get the message value on event and post to ui */
  let messages = event;
  Js.log2("messages", messages);
  messages;
};

// let fetchDogs = () => fetch(dogsUrl);
// Wonka.fromPromise(fetchDogs())
// |> Wonka.subscribe((. x) => Js.log2("fetchDogs", x));

let mapToMessage: Js.t('a) => string =
  messagesJs => {
    // let data = messagesJs->Obj.magic;
    let data = messagesJs;
    data##response |> Js.log2("data##body");
    let message = data##body##message;
    message;
  };
let handleMsg = (json: Fetch.response) => {
  let json = json->Obj.magic;
  Js.log2("JSON", json);
  mapToMessage(json) |> Js.log;
};
let data = Fetch.fetch(dogsUrl);
// let _ = Wonka.fromPromise(data) |> Wonka.subscribe((. x) => handleMsg(x));
Js.log2("result",data)
let _ =
  HttpClient.get(~resource=dogsUrl)
  |> Wonka.map((. result) => {
      Js.log2("result",result)
       switch (result) {
       | HttpClient.Ok(data) => Js.log(data)
       | HttpClient.Failure
       | HttpClient.FailureCode(_) => Js.log("Failure")
       }
     });
