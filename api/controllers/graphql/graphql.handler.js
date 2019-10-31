const { graphQLErrorHandler } = require('./graphql.error.handlerr');

const graphQLHandler = ({ handler, validator }) => {
  return async (root, args, context) => {
    try {
      const returnValue = await handler(root, args, context);
      const validate = await validator(returnValue);
      return validate;
    } catch (err) {
      graphQLErrorHandler(err);
    }
  };
};

const graphQLExpressRouteHandler = ({ handler, validator }) => {
  return async (request, response) => {
    try {
      const returnValue = await handler(request, response);
      return await validator(returnValue);
    } catch (err) {
      graphQLErrorHandler(err);
    }
  };
};

module.exports = {
  graphQLHandler,
  graphQLExpressRouteHandler
};
