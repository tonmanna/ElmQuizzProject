export default (model) => {
  if (window.currentEditor != null) {
    window.currentEditor.dispose();
    window.currentEditor = null;
  }
};
