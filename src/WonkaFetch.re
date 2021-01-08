type response = {
  messages: array(string),
  status: int,
};

[@bs.module] external nodeFetch: string => Promise.t(response) = "node-fetch";
[@bs.module] external fetch: string => Js.Promise.t(response) = "node-fetch";

[@bs.send] external text: response => Promise.t(string) = "text";

[@bs.send] external json: response => Promise.t(response) = "json";
