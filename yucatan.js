const _yucatan = {};

const serve = handler => {
  if (globalThis.Deno) {
    const env = Deno.env.toObject();
    Deno.serve(request => handler(request, env));
  }
  _yucatan.fetch = handler;
};

const schedule = handler => {
  _yucatan.scheduled = handler;
};

export { serve, schedule };
