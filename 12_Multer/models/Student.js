const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: false },
  age: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  phone: { type: String, required: false },
  address: { type: String, required: false },
});

module.exports = mongoose.model("Student", studentSchema);
