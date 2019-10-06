export default app => {
  app.ports.from_js.send("1.0.0 from JS");
};
