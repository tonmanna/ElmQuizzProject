const {
  validateGraphQLHeader
} = require("../../schema/graphql/graphql-header.schema");
const {
  graphQLHandler
} = require("./graphql-handler");

const {
  graphqlExpress
} = require("apollo-server-express");
const {
  validateGraphQLResponse
} = require("../../schema/graphql/graphql-response.schema");

const schema = require("../../schema/graphql").schema;


const createGraphQlExpress = async (req, res, next) => {
  graphqlExpress({
    schema: schema,
    context: {},
    tracing: true,
    cacheControl: true
  })(req, res, next);
};

const graphQLExpressHandler = async (req, res, next) => {
  await createGraphQlExpress(validateGraphQLHeader(req), res, next);
};

module.exports = {
  graphQLExpressHandler: graphQLHandler({
    handler: graphQLExpressHandler,
    validator: validateGraphQLResponse
  })
};