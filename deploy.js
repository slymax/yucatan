import { bundle } from "https://slymax.com/scripts/bundle.js";

const code = await bundle(Deno.args[0]);
const result = code + "export default { fetch: _yucatan.fetch, scheduled: _yucatan.scheduled };";

localStorage.account_id = localStorage.account_id || prompt("Cloudflare Account ID:");
localStorage.api_key = localStorage.api_key || prompt("Cloudflare API Key:");

const old_script_name = localStorage.script_name;
const new_script_name = prompt("Script Name" + (old_script_name ? ` [${old_script_name}]:` : ":"));

localStorage.script_name = new_script_name || old_script_name;

const { account_id, api_key, script_name } = localStorage;

const cf_url = `https://api.cloudflare.com/client/v4/accounts/${account_id}/workers/scripts/${script_name}`;

const file = new File([result], "script.js", { type: "text/javascript+module" });
const body = new FormData();

body.append("script.js", file);
body.append("metadata", JSON.stringify({
  main_module: "script.js"
}));

console.log("Deploying...");

try {
  await fetch(cf_url, {
    "method": "PUT",
    "headers": {
      "Authorization": "Bearer " + api_key
    },
    body
  });
} catch (error) {
  console.error(error);
}
