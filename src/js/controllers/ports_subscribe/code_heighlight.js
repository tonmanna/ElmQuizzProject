import Prism from "prismjs";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
export default model => {
  var content = model.questions[model.currentQuestion - 1];
  if (model.currentQuestion != 0 && content != undefined) {
    setTimeout(function() {
      renderMermaid(content, model);
      renderPrism(content, model);
      renderMarkDownIT(content, model);
    }, 100);
  }
};

function renderPrism(content, model) {
  var codeID = "#code" + model.currentQuestion;
  const html = Prism.highlight(
    content.code,
    Prism.languages.javascript,
    "javascript"
  );
  $(codeID).empty();
  $(codeID).append(html);
}
function renderMarkDownIT(content, model) {
  var markdownID = "#markdown" + model.currentQuestion;
  console.log("content.markdown: ", content.markdown);
  var mdHtml = md.render(content.markdown);
  console.log("mdHtml: ", mdHtml);
  $(markdownID).empty();
  $(markdownID).append(mdHtml);
}

function renderMermaid(content, model) {
  var svgID = "svgmermaid" + model.currentQuestion;
  var mermaidID = "#mermaid" + model.currentQuestion;
  var prevMermaidID = "#mermaid" + (model.currentQuestion - 1);
  var lastMermaidID = "#mermaid" + (model.currentQuestion + 1);

  $(mermaidID).empty();
  $(prevMermaidID).empty();
  $(lastMermaidID).empty();
  if (content.mermaid.length > 5) {
    mermaid.render(svgID, content.mermaid, function(element) {
      $(mermaidID).append(element);
    });
  }
}
