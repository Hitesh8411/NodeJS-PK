const express = require("express");
const app = express();

require("dotenv").config();

const db = require("./db");
const passport = require("./auth");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//Middleware Function
const logRequest = (req, res, next) => {
  console.log(` ${req.url} at ${new Date()}`);
  next();
};
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", localAuthMiddleware, function (req, res) {
  res.send("welcome to our DHABA");
});

// Importing router files
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

const menuItemRoutes = require("./routes/menuItemRoutes");
app.use("/menu", menuItemRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
