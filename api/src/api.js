const express = require('express');
const serverless = require("serverless-http");
const router = express.Router();


// const gqlRoute = require('./routers/graphql.route');
const routeExpress = require('./routers/app.route')
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// gqlRoute(app);
// routeExpress(app);
// app.listen(process.env.PORT || 4000,
//   () => console.log("Server is running..."));

routeExpress(router)
app.use(`/.netlify/functions/api`,router );
module.exports = app;
module.exports.handler = serverless(app);
