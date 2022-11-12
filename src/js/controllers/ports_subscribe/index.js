import code_heighlight from "./code_heighlight";
import change_answer from "./change_answer";
import submit_answer from "./submit_answer";
import monaco from "./monaco";
import monaco_get_text from "./monaco_get_text";

export default (app) => {
  app.ports.code_heighlight.subscribe(function (model) {
    code_heighlight(model);
  });

  app.ports.change_answer.subscribe(function (model) {
    change_answer(model);
  });

  app.ports.submit_answer.subscribe(function (model) {
    submit_answer(model);
  });

  app.ports.init_monaco.subscribe(function (model) {
    monaco(model, app);
  });

  app.ports.monaco_get_text.subscribe(function (model) {
    monaco_get_text(model, app);
  });
};
