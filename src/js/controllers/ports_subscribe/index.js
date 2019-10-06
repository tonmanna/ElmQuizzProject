import mermaid_markdown_code_heighlight from "./mermaid_markdown_code_heighlight";
import submit_answer from "./submit_answer";
export default app => {
  app.ports.mermaid_markdown_code_heighlight.subscribe(function(model) {
    mermaid_markdown_code_heighlight(model);
  });

  app.ports.submit_answer.subscribe(function(model) {
    submit_answer(model);
  });
};
