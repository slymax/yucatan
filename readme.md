# Yucatan

Yucatan is a tiny framework that allows you to run servers locally using Deno and to deploy them to Cloudflare Workers.

```js
// index.js
import { serve, schedule } from "https://slymax.com/yucatan/yucatan.js";

serve(request => {
  // runs on a worker request
  return new Response("Hello World!");
});

schedule(event => {
  // runs when a worker is scheduled
});
```

Run locally with Deno:

```sh
deno run index.js
```

Deploy to Cloudflare Workers:

```sh
deno run -A https://slymax.com/yucatan/deploy.js index.js
```
