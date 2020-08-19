# [graphql-ppx-xml](https://gist.github.com/idkjs/efe2c7e5949d6a6d86aadffe27d3b7db)

Inspired by [@chenglou]'s [gist](https://gist.github.com/chenglou/b6cf738a5d7adbde2ee008eb93117b49)

# Handle Routing Yourself

To serve the files, this template uses a minimal dependency called `moduleserve`. A URL such as `localhost:8000/scores/john` resolves to the file `scores/john.html`. If you'd like to override this and handle URL resolution yourself, change the `server` command in `package.json` from `moduleserve ./ --port 8000` to `moduleserve ./ --port 8000 --spa` (for "single page application"). This will make `moduleserve` serve the default `index.html` for any URL. Since `index.html` loads `Index.bs.js`, you can grab hold of the URL in the corresponding `Index.re` and do whatever you want.

By the way, ReasonReact comes with a small [router](https://reasonml.github.io/reason-react/docs/en/router) you might be interested in.
