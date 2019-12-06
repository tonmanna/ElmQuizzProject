const Raven = require('raven');

class GraphQLError extends Error {
  constructor (params) {
    super(...params);

    if (Error.captureStackTrace) Error.captureStackTrace(this, GraphQLError);
    if (process.env.dev !== true || process.env.dev === undefined) {
      Raven.captureException(params);
    }

    this.name = 'GraphQLError';
    this.date = new Date();
    this.message = params;
  }
}

module.exports = GraphQLError;
