export default (app) => {
  // app.ports.from_js.send("Unknown");
  console.log(app);
  app.ports.from_date.send(
    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
  );
};
