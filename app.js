var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const cors = require("cors");
var config = require("./config/Config.js");
var monoogse = require("mongoose");
const bodyParser = require("body-parser");
const sidebarLinks = require("./data/sidebarLinks.cjs");
var logoutRouter = require("./routes/logout");
var Router = require("./routes/index.js");
// userrouter
var userrouter = require("./routes/users.js");

var app = express();
app.use(cors());
// Make sidebarLinks available to your entire application
app.locals.sidebarLinks = sidebarLinks;

app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html"); // Change the view engine to 'html'
app.engine("html", require("ejs").renderFile); // Use ejs to render HTML files

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", Router);
// app.use("/", indexRouter);
app.use("/users", userrouter);
// Serve static files from the 'public' directory
app.use(express.static("public"));
// app.use('/api', loginRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
monoogse
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "majority",
      wtimeout: 0,
      provenance: "clientSupplied"
    }
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = config.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// // Drop the index
// db.candidatepancarddatas.dropIndex("candidateName_1");

module.exports = app;
