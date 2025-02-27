import mermaid from "mermaid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
