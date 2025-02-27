import * as Prism from "prismjs";
import MarkdownIt from "markdown-it";
import mermaid from "mermaid";
import { MainModel, QuestionModel } from "../../types";
import $ from "jquery";
const md = new MarkdownIt();
export default (model: MainModel) => {
  const content = model.questions[model.questionNumber - 1];
  if (model.questionNumber != 0 && content != undefined) {
    setTimeout(function () {
      renderMermaid(content, model);
      renderPrism(content, model);
      renderMarkDownIT(content, model);
    }, 100);
  }
};

function renderPrism(content: QuestionModel, model: MainModel) {
  const codeID = "#code" + model.questionNumber;
  const html = Prism.highlight(
    content.code,
    Prism.languages.javascript,
    "javascript"
  );
  $(codeID).empty();
  $(codeID).append(html);
}
function renderMarkDownIT(content: QuestionModel, model: MainModel) {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  const markdownID = "#markdown" + model.questionNumber;

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrSet("target", "_blank");
    return defaultRender(tokens, idx, options, env, self);
  };
  const mdHtml = md.render(content.markdown);

  $(markdownID).empty();
  $(markdownID).append(mdHtml);
}
async function renderMermaid(content: QuestionModel, model: MainModel) {
  const svgID = "svgmermaid" + model.questionNumber;
  const mermaidID = "#mermaid" + model.questionNumber;
  const prevMermaidID = "#mermaid" + (model.questionNumber - 1);
  const lastMermaidID = "#mermaid" + (model.questionNumber + 1);

  $(mermaidID).empty();
  $(prevMermaidID).empty();
  $(lastMermaidID).empty();
  if (content.mermaid.length > 5) {
    const mermaidRender = await mermaid.render(svgID, content.mermaid);
    $(mermaidID).append(mermaidRender.svg);
  }
}
