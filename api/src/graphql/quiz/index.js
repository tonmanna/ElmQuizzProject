const path = require('path');
const readFileSync = require('fs').readFileSync;

const quiz_type_defs = readFileSync(
    path.join(__dirname, './schema.gql'),
    'utf8'
);

// ------------------------------

module.exports = quiz_type_defs;
