import { Elm } from "./src/components/quiz.elm";
var app = Elm.SimpleQuizz.init({
  node: document.getElementById("app"),
  flags: "1.0.0"
});
// app.ports.fromJS.send("1.0.0 from JS")
app.ports.toJS.subscribe(function(model) {
  var content = model.questions[model.currentQuestion - 1];
  if (model.currentQuestion != 0 && content != undefined) {
    var svgID = "svgmermaid" + model.currentQuestion;
    var mermaidID = "#mermaid" + model.currentQuestion;
    var codeID = "#code" + model.currentQuestion;
    var prevMermaidID = "#mermaid" + (model.currentQuestion - 1);
    var lastMermaidID = "#mermaid" + (model.currentQuestion + 1);

    $(mermaidID).empty();
    $(prevMermaidID).empty();
    $(lastMermaidID).empty();
    setTimeout(function() {
      mermaid.render(svgID, content.mermaid, function(element) {
        $(mermaidID).append(element);
      });
      document.querySelectorAll(codeID).forEach(block => {
        hljs.highlightBlock(block);
      });
    }, 100);
  }
});
