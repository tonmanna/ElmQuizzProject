import { MainModel } from "../../types";

export default (model: MainModel) => {
  function showDialog() {
    // Get the snackbar DIV
    const x = document.getElementById("snackbar");
    if (x == null) {
      return;
    }
    x.innerHTML =
      "<div>Thanks : <b>" +
      model.candidateID +
      "<b></div><div>You answer are submitted..</div>";

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      if (x == null) {
        return;
      }
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  showDialog();
};
