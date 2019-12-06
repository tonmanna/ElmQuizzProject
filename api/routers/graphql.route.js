const { ApolloServer } = require('apollo-server-express');
const myGraphQLSchema = require('../graphql');
module.exports = app => {
  const server = new ApolloServer(myGraphQLSchema);
  server.applyMiddleware({
    app
  });
};
