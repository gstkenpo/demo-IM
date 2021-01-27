require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

/**
 * Connect monogoDB on localhost
 */
const mongoose = require("mongoose");
const mongoUrl = process.env.DB_URL;
const options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect(mongoUrl, options, 
  error => {
    if (error) console.log('error when connect monogo:' + error);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
module.exports = app;
