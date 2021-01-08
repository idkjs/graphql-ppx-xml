open BsNodeFetch;

module Option = {
  let unwrapUnsafely =
    fun
    | Some(v) => v
    | None => raise(Invalid_argument("unwrapUnsafely called on None"));
};

Js.Promise.(
  fetch("https://dog.ceo/api/breeds/list/all")
  |> then_(Response.text)
  |> then_((text) => print_endline(text) |> resolve)
)|>ignore;

Js.Promise.(
  fetchWithInit("https://dog.ceo/api/breeds/list/all", RequestInit.make(~method_=Post, ()))
  |> then_(Response.text)
  |> then_((text) => print_endline(text) |> resolve)
)|>ignore;
