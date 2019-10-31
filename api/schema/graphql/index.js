const _ = require('lodash');
const path = require('path');
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const readFileSync = require('fs').readFileSync;
// ----------------- Tag Manager
const sample_type_defs = readFileSync(path.join(__dirname, './sample/schema.gql'), 'utf8');
const sample_resolver = require('../../controllers/graphql/sample');
// ------------------------------

var typeDefs = '';
typeDefs = typeDefs.concat(sample_type_defs);

var resolvers = {};
resolvers = _.merge(
    resolvers, sample_resolver
);

exports.schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});