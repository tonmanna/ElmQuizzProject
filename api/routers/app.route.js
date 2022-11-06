const { express } = require('../controllers/quiz')
module.exports = app => {
    app.get('/getQuiz', express.getQuizExpress)
    app.post('/submitAnswer', express.submitQuizExpress)
}