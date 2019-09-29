import { Elm } from "./src/components/quiz.elm";
var app = Elm.SimpleQuizz.init({node: document.getElementById("app"), flags : "0.0"});
app.ports.fromJS.send("1.0.0 from JS")
app.ports.toJS.subscribe(function(options) {
  console.log(options);  
});
