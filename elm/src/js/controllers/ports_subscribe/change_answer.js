export default model => {
  var content = model.questions[model.questionNumber - 1];
  if (model.currentQuestion != 0 && content != undefined) {
    console.log("Answer model: ", model);
  }
};
