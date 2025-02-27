import "monaco-editor/esm/vs/editor/editor.all.js";
import "monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp.js";
import * as monaco from "monaco-editor";
import { MainModel } from "../../types";
declare let window: any;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function waitUntilEditorDefine(model: MainModel) {
  const element = "container" + model.questionNumber;
  const editor = document.getElementById(element);
  if (editor == null) {
    await sleep(100);
    return waitUntilEditorDefine(model);
  }
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
    wrappingIndent: "indent",
    theme: "vs-dark",
    minimap: {
      enabled: false,
    },
  });
}
export function disposeEditor() {
  if (window.currentEditor) {
    window.currentEditor.dispose();
    window.currentEditor = null;
  }
}
