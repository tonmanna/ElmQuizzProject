const { express } = require('../controllers/quiz')
module.exports = router => {
    router.get('/getQuiz', express.getQuizExpress)
    router.post('/submitAnswer', express.submitQuizExpress)
}