import { Elm } from "../Main.elm";
import subsrcibe from "./controllers/ports_subscribe";
import send from "./controllers/ports_send";
var app = Elm.Main.init({
  node: document.getElementById("app"),
  flags: "1.0.0"
});
subsrcibe(app);
send(app);
