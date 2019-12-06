const express = require('express');
const gqlRoute = require('./routers/graphql.route');
const app = express();
gqlRoute(app);
app.listen(
  {
    port: 4000
  },
  () => console.log('Server ready at http://localhost')
);
