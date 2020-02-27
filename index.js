const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const eventRouter = require("./Event/router");

const app = express();
const corsMiddleware = cors();
const parserMiddleware = bodyParser.json();
const port = 4000;

app.use(corsMiddleware);
app.use(parserMiddleware);
app.use(eventRouter);

app.listen(port, () => console.log("Listening to " + port));
