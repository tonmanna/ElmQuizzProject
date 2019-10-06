import Prism from "prismjs";
export default model => {
  var content = model.questions[model.currentQuestion - 1];
  if (model.currentQuestion != 0 && content != undefined) {
    var svgID = "svgmermaid" + model.currentQuestion;
    var mermaidID = "#mermaid" + model.currentQuestion;
    var codeID = "#code" + model.currentQuestion;
    var prevMermaidID = "#mermaid" + (model.currentQuestion - 1);
    var lastMermaidID = "#mermaid" + (model.currentQuestion + 1);

    $(mermaidID).empty();
    $(codeID).empty();
    $(prevMermaidID).empty();
    $(lastMermaidID).empty();
    setTimeout(function() {
      if (content.mermaid.length > 5) {
        mermaid.render(svgID, content.mermaid, function(element) {
          $(mermaidID).empty();
          $(mermaidID).append(element);
        });
      }
      const html = Prism.highlight(
        content.code,
        Prism.languages.javascript,
        "javascript"
      );
      $(codeID).empty(html);
      $(codeID).append(html);
    }, 100);
  }
};