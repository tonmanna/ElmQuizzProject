const _ = require('lodash');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const quiz_type_defs = require('./quiz');
const { resolver } = require('../controllers/quiz');
// ------------------------------

var typeDefs = '';
typeDefs = typeDefs.concat(
  quiz_type_defs,
);

var resolvers = {};
resolvers = _.merge(resolvers, resolver);

exports.schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
