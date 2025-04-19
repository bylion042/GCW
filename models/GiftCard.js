const mongoose = require('mongoose');

const GiftCardSchema = new mongoose.Schema({
  cardType: String,
  cardBrand: String,
  currency: String,
  amount: Number,
  code: String,
  imagePaths: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GiftCard', GiftCardSchema);
