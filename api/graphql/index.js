const _ = require('lodash');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const quiz_type_defs = require('./quiz');
const quiz_resolver = require('../controllers/quiz');
// ------------------------------

var typeDefs = '';
typeDefs = typeDefs.concat(
  quiz_type_defs,
);

var resolvers = {};
resolvers = _.merge(resolvers, quiz_resolver);

exports.schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
