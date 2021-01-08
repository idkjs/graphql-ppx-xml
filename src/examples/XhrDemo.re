
Warp.Method.get(DogsUrl.url)

->Warp.Event.onLoad(response => {
    switch (response) {
    | Belt.Result.Ok(Some(data)) => Js.Console.log(data)
    | Belt.Result.Ok(None) => Js.Console.info("No Response!")
    | Belt.Result.Error(message) => Js.Console.error(message)
    }
  })
->Warp.send|>ignore;
