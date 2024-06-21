const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  whatsappNumber: { type: String, required: true },
});

module.exports = mongoose.model("User-Femi", userSchema);
