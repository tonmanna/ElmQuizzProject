export default (model) => {
  function showDialog() {
    // Get the snackbar DIV
    console.log("model: ", model);
    var x = document.getElementById("snackbar");
    x.innerHTML =
      "<div>Thanks : <b>" +
      model.candidateID +
      "<b></div><div>You answer are submitted..</div>";

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  showDialog();
};
