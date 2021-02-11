import Prism from "prismjs";
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
export default model => {
  var content = model.questions[model.questionNumber - 1];
  if (model.questionNumber != 0 && content != undefined) {
    setTimeout(function () {
      renderMermaid(content, model);
      renderPrism(content, model);
      renderMarkDownIT(content, model);
    }, 100);
  }
};

function renderPrism(content, model) {
  var codeID = "#code" + model.questionNumber;
  const html = Prism.highlight(
    content.code,
    Prism.languages.javascript,
    "javascript"
  );
  $(codeID).empty();
  $(codeID).append(html);
}
function renderMarkDownIT(content, model) {
  var markdownID = "#markdown" + model.questionNumber;
  var mdHtml = md.render(content.markdown);
  $(markdownID).empty();
  $(markdownID).append(mdHtml);
}

function renderMermaid(content, model) {
  var svgID = "svgmermaid" + model.questionNumber;
  var mermaidID = "#mermaid" + model.questionNumber;
  var prevMermaidID = "#mermaid" + (model.questionNumber - 1);
  var lastMermaidID = "#mermaid" + (model.questionNumber + 1);

  $(mermaidID).empty();
  $(prevMermaidID).empty();
  $(lastMermaidID).empty();
  if (content.mermaid.length > 5) {
    console.log('content: ', content);
    mermaid.render(svgID, content.mermaid, function (element) {
      $(mermaidID).append(element);
    });
  }
}
