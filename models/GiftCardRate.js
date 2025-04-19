const mongoose = require('mongoose');

const giftCardRateSchema = new mongoose.Schema({
  brand: { type: String, required: true, unique: true },
  rateUSD: { type: Number, required: true }
});

module.exports = mongoose.model('GiftCardRate', giftCardRateSchema);
