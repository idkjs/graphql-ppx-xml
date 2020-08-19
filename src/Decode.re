let data = response => {
  Js.log2("response", response);

  //  Response is:
  // data: {
  //     user: {
  //     id: 1,
  //     username: 'Bret',
  //     email: 'Sincere@april.biz',
  //     phone: '1-770-736-8031 x56442',
  //     website: 'hildegard.org'
  //     }
  // }

  // get data object off of response
  let data = Obj.magic(response)##data;
  Js.log2("(response)##data", data);

  //  Convert Js.Json.t to Query.Raw.t which is of type
  // `type t = {user: Js.Nullable.t(t_user)}`
  let typedResponse: Query.Raw.t = Query.unsafe_fromJson(data);
  Js.log2("typedResponse", typedResponse);
  //   convert Query.Raw.t to Query.t
  let parsedData: Query.t = Query.parse(typedResponse);
  let username =
    switch (parsedData) {
    | {user: Some({username})} => username
    /* the user's name is null */
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

  Js.log2("user's id is: ", user.id);
  Js.log2("user is: ", user);
  user;
};
