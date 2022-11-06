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

const submitQuizExpressHandler = async (req, res) => {
    console.log('req.body: ', req.body);
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
    getQuizExpress: expressHandler({
        handler: getQuizExpressHandler,
        validator: (data) => data

    }),
    submitQuizExpress: expressHandler({
        handler: submitQuizExpressHandler,
        validator: (data) => data
    })
}

module.exports =
{
    resolver,
    express
};
