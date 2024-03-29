import "monaco-editor/esm/vs/editor/editor.all.js";
import "monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js";

function waitUntilEditorDefine(model, app) {
  const element = "container" + model.questionNumber;
  const editor = document.getElementById(element);
  if (!editor || window.currentEditor == undefined) {
    setTimeout(() => {
      waitUntilEditorDefine(model, app);
    }, 100);
  } else {
    var text = window.currentEditor.getValue();
    if (text != "") {
      app.ports.from_monaco.send(text);
    }
  }
}

export default (model, app) => {
  waitUntilEditorDefine(model, app);
};
