const mongoose = require('mongoose');

const ConversionSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Reference to the logged-in user
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  convertedAmount: { type: Number, required: true },
  conversionRate: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Conversion', ConversionSchema);
