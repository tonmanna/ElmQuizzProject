import "monaco-editor/esm/vs/editor/editor.all.js";
import "monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js";
import * as monaco from "monaco-editor";
function waitUntilEditorDefine(model, app) {
  const element = "container" + model.questionNumber;
  const editor = document.getElementById(element);
  const script = model.questions[model.questionNumber - 1].script;
  window.currentEditor = monaco.editor.create(editor, {
    value: script,
    language:
      model.questions[model.questionNumber - 1].language || "javascript",
    lineNumbers: "on",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false,
    wordWrap: "wordWrapColumn",
    wordWrapColumn: 80,
    wordWrapMinified: true,
    wrappingIndent: "indent",
    theme: "vs-dark",
    minimap: {
      enabled: false,
    },
  });
  window.currentEditor.getModel().onDidChangeContent((event) => {
    var text = window.currentEditor.getValue();
    setTimeout(() => {
      app.ports.from_monaco.send(text);
    }, 1000);
  });
}
export default (model, app) => {
  if (window.currentEditor) {
    app.ports.from_monaco.send("");
    window.currentEditor.dispose();
    window.currentEditor = null;
  }
  setTimeout(() => {
    waitUntilEditorDefine(model, app);
  }, 1000);
};
