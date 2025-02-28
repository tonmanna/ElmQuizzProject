export function showDialog(candidateID: string) {
  // Get the snackbar DIV
  const x = document.getElementById("snackbar");
  if (x == null) {
    return;
  }
  x.innerHTML =
    "<div>Thanks : <b>" +
    candidateID +
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

export function simpleErrorDialog(message: string) {
  const errorDialog = document.createElement("div");
  errorDialog.className = "alert alert-danger";
  errorDialog.role = "alert";
  errorDialog.style.position = "fixed";
  errorDialog.style.top = "20px";
  errorDialog.style.right = "10px";
  errorDialog.style.zIndex = "1000";

  errorDialog.innerText = message;
  document.body.appendChild(errorDialog);
  setTimeout(() => {
    document.body.removeChild(errorDialog);
  }, 2000);
}
