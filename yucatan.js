const _yucatan = {};

const serve = handler => {
  globalThis.Deno && Deno.serve(handler);
  _yucatan.fetch = handler;
};

const schedule = handler => {
  _yucatan.scheduled = handler;
};

export { serve, schedule };
