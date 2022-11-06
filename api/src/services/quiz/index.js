const quiz = require('../../data/quiz');

const getQuiz = async () => {
    const result = await quiz.getQuiz();
    return result;
}

module.exports = {
    getQuiz
}