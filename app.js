const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const expressValidator = require("express-validator");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(expressValidator());
app.use("/", require("./routes/index"));

app.listen(4000, function() {
  console.log("product api  is up and running");
});
