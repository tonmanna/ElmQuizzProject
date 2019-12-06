const { getQuiz } = require('../../services/quiz');
const { graphQLHandler } = require('../graphql-handler');
const { validateResponseQuiz } = require('../../schema/quiz');

const getQuizHandler = async (root, args, context) => {
    return await getQuiz();
}

const resolver = {
    Query: {
        getQuiz: graphQLHandler({
            handler: getQuizHandler,
            validator: validateResponseQuiz
        })
    }
};

module.exports = resolver;
