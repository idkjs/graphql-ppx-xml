// Entry point

[@bs.val] external document: Js.t({..}) = "document";

// We're using raw DOM manipulations here, to avoid making you read
// ReasonReact when you might precisely be trying to learn it for the first
// time through the examples later.
let style = document##createElement("style");
document##head##appendChild(style);
style##innerHTML #= ExampleStyles.style;

let makeContainer = text => {
  let container = document##createElement("div");
  container##className #= "container";

  let title = document##createElement("div");
  title##className #= "containerTitle";
  title##innerText #= text;

  let content = document##createElement("div");
  content##className #= "containerContent";

  let () = container##appendChild(title);
  let () = container##appendChild(content);
  let () = document##body##appendChild(container);

  content;
};
Warp.Method.get(DogsUrl.url)
// ->Warp.ResponseType.setJson
// ->Warp.QueryString.set([
//     ("firstname", "Max"),
//     ("lastname", "Mustermann"),
//     ("username", "max"),
//     ("email", "max@mustermann.de"),
//   ])
// ->Warp.Header.add("authorization", "Bearer 123")
->Warp.Event.onLoad(response => {
    switch (response) {
    | Belt.Result.Ok(Some(data)) => Js.Console.log(data)
    | Belt.Result.Ok(None) => Js.Console.info("No Response!")
    | Belt.Result.Error(message) => Js.Console.error(message)
    }
  })
->Warp.send|>ignore;

ReactDOMRe.render(
  <FetchDogsGraphql />,
  makeContainer("https://formidadog-ql.netlify.app/graphql"),
);

ReactDOMRe.render(
  <FetchedDogsNoPromises />,
  makeContainer("Dog Pictures Without Promises"),
);
ReactDOMRe.render(
  <FetchedDogsWonka />,
  makeContainer("Dog Pictures With Wonka"),
);


