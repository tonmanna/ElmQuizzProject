const express = require('express');

const gqlRoute = require('./routers/graphql.route');
const routeExpress = require('./routers/app.route')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

gqlRoute(app);
routeExpress(app);
app.listen(process.env.PORT || 4000,
  () => console.log("Server is running..."));
