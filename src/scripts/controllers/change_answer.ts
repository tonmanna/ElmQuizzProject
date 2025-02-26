import mermaid from "mermaid";

declare let window: any;
export default () => {
  if (window.currentEditor != null) {
    window.currentEditor.dispose();
    window.currentEditor = null;
  }
  mermaid.initialize({
    startOnLoad: false,
  });
};
