const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  timeAvailable: { type: String, required: true },
  specialization: { type: String, required: true }
});

module.exports = mongoose.model('Doctor', doctorSchema);
