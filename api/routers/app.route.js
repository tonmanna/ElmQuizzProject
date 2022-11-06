const { express } = require('../controllers/quiz')
module.exports = app => {
    app.get('/getQuiz', express.getQuizExpressHandler)
}