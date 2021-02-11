class GraphQLError extends Error {
  constructor(params) {
    super(...params);

    this.name = 'GraphQLError';
    this.date = new Date();
    this.message = params;
  }
}

module.exports = GraphQLError;
