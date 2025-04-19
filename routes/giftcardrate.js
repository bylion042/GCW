const express = require('express');
const router = express.Router();
const GiftCardRate = require('../models/GiftCardRate');

// One-time seeding or manual updating route
router.get('/seed-rates', async (req, res) => {
  const rates = [
    { brand: 'Razer', rateUSD: 0 },
    { brand: 'Apple&iTunes', rateUSD: 0 },
    { brand: 'Steam', rateUSD: 0 },
    { brand: 'Google', rateUSD: 0 },
    { brand: 'Xbox', rateUSD: 0 },
    { brand: 'Vanilla', rateUSD: 0 },
    { brand: 'Amazon', rateUSD: 0 },
    { brand: 'AMEX', rateUSD: 0 },
    { brand: 'Mastercard', rateUSD: 0 },
    { brand: 'Nordstrom', rateUSD: 0 },
    { brand: 'eBay', rateUSD: 0 },
    { brand: 'Nike', rateUSD: 0 },
    { brand: 'PayStation', rateUSD: 0 },
    { brand: 'Netspend', rateUSD: 0 },
    { brand: 'GameStop', rateUSD: 0 },
    { brand: 'Paysafecard', rateUSD: 0 },
    { brand: 'Moneycard', rateUSD: 0 },
    { brand: 'Walmart', rateUSD: 0 },
    { brand: 'BestBuy', rateUSD: 0 },
    { brand: 'CVS', rateUSD: 0 },
    { brand: 'Roblox', rateUSD: 0 },
    { brand: 'Macy\'s', rateUSD: 0 },
    { brand: 'Footlocker', rateUSD: 0 },
    { brand: 'VISA', rateUSD: 0 },
    { brand: 'Sephora', rateUSD: 0 },
    { brand: 'WalmartMoneyCard', rateUSD: 0 }
  ];
  

  try {
    for (const rate of rates) {
      await GiftCardRate.findOneAndUpdate(
        { brand: rate.brand.toLowerCase() },
        { rateUSD: rate.rateUSD },
        { upsert: true, new: true }
      );
    }
    res.send('Gift card rates seeded/updated successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update rates');
  }
});

module.exports = router;
