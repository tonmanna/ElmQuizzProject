import { Elm } from "./src/components/quiz.elm";
var app = Elm.SimpleQuizz.init({node: document.getElementById("app"), flags : "0.0"});
app.ports.sendToJS.send("1.0.0")
app.ports.subFromJS.subscribe(function(options) {
  console.log(options);  
});
