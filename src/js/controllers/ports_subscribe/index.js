import code_heighlight from "./code_heighlight";
import submit_answer from "./submit_answer";
export default app => {
  app.ports.code_heighlight.subscribe(function(model) {
    code_heighlight(model);
  });

  app.ports.submit_answer.subscribe(function(model) {
    submit_answer(model);
  });
};
