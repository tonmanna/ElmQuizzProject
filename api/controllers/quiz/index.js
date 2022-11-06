const { getQuiz } = require('../../services/quiz');
const { graphQLHandler } = require('../graphql-handler');
const { expressHandler } = require('../express-handler');
const { validateResponseQuiz } = require('../../schema/quiz');

const getQuizHandler = async (root, args, context) => {
    return await getQuiz();
}
const getQuizExpressHandler = async (req, res) => {
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

const express = {
    getQuizExpressHandler: expressHandler({
        handler: getQuizExpressHandler,
        validator: (data) => data

    })
}

module.exports =
{
    resolver,
    express
};
