import "monaco-editor/esm/vs/editor/editor.all.js";
import "monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js";
import { MainModel } from "../../types";
declare let window: any;
function waitUntilEditorDefine(model: MainModel) {
  const element = "container" + model.questionNumber;
  const editor = document.getElementById(element);
  if (!editor || window.currentEditor == undefined) {
    setTimeout(() => {
      waitUntilEditorDefine(model);
    }, 100);
  } else {
    var text = window.currentEditor.getValue();
    // if (text != "") {
    //   app.ports.from_monaco.send(text);
    // }
  }
}

export default (model: MainModel) => {
  waitUntilEditorDefine(model);
};
