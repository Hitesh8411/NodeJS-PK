const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

const studentRoutes = require("./routes/studentRoutes");

app.use("/student", studentRoutes);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
