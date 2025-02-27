import * as Prism from "prismjs";
import MarkdownIt from "markdown-it";
import mermaid from "mermaid";
import { MainModel, QuestionModel } from "../../types";
import $ from "jquery";
const md = new MarkdownIt();
export default (model: MainModel) => {
  var content = model.questions[model.questionNumber - 1];
  if (model.questionNumber != 0 && content != undefined) {
    setTimeout(function () {
      renderMermaid(content, model);
      renderPrism(content, model);
      renderMarkDownIT(content, model);
    }, 100);
  }
};

function renderPrism(content: QuestionModel, model: MainModel) {
  var codeID = "#code" + model.questionNumber;
  const html = Prism.highlight(
    content.code,
    Prism.languages.javascript,
    "javascript"
  );
  $(codeID).empty();
  $(codeID).append(html);
}
function renderMarkDownIT(content: QuestionModel, model: MainModel) {
  var defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  var markdownID = "#markdown" + model.questionNumber;

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrSet("target", "_blank");
    return defaultRender(tokens, idx, options, env, self);
  };
  var mdHtml = md.render(content.markdown);

  $(markdownID).empty();
  $(markdownID).append(mdHtml);
}
async function renderMermaid(content: QuestionModel, model: MainModel) {
  var svgID = "svgmermaid" + model.questionNumber;
  var mermaidID = "#mermaid" + model.questionNumber;
  var prevMermaidID = "#mermaid" + (model.questionNumber - 1);
  var lastMermaidID = "#mermaid" + (model.questionNumber + 1);

  $(mermaidID).empty();
  $(prevMermaidID).empty();
  $(lastMermaidID).empty();
  if (content.mermaid.length > 5) {
    const mermaidRender = await mermaid.render(svgID, content.mermaid);
    $(mermaidID).append(mermaidRender.svg);
  }
}
