export default model => {
  var content = model.questions[model.currentQuestionNumber - 1];
  if (model.currentQuestion != 0 && content != undefined) {
    console.log("Answer model: ", model);
  }
};
