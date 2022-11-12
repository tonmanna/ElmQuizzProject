import "monaco-editor/esm/vs/editor/editor.all.js";
import "monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js";

export default (model, app) => {
  if (window.currentEditor) {
    var text = window.currentEditor.getValue();
    app.ports.from_monaco.send(text);
  } else {
    app.ports.from_monaco.send("");
    console.log("window.currentEditor is undefined");
  }
};
