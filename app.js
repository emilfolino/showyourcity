const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const main = require("./route/main.js");
const auth = require("./route/auth.js");

const authModel = require("./models/auth.js");

const port = 8666;

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

app.set("view engine", "ejs");

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.all('*', authModel.checkAPIKey);

app.use("/auth", auth);
app.use("/", main);

const server = app.listen(port, () => console.log('Order api listening on port ' + port));

module.exports = server;
