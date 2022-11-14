import "monaco-editor/esm/vs/editor/editor.all.js";
import "monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js";
import * as monaco from "monaco-editor";

export default (model, app) => {
  if (window.currentEditor) {
    app.ports.from_monaco.send("");
    window.currentEditor.dispose();
    window.currentEditor = null;
  }
  setTimeout(() => {
    const content = document.getElementById("container" + model.questionNumber);
    if (content) {
      const script = model.questions[model.questionNumber - 1].script;
      window.currentEditor = monaco.editor.create(content, {
        value: script,
        language: "javascript",
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        wordWrap: "wordWrapColumn",
        wordWrapColumn: 80,
        wordWrapMinified: true,
        theme: "lgtheme",
        wrappingIndent: "indent",
        minimap: {
          enabled: false,
        },
      });

      window.currentEditor.getModel().onDidChangeContent((event) => {
        var text = window.currentEditor.getValue();
        app.ports.from_monaco.send(text);
      });
    } else {
      console.log("content is undefined");
    }
  }, 1000);
};
