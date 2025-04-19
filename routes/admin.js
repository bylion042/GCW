const express = require('express');
const GiftCard = require('../models/GiftCard'); // Make sure this path is correct
const router = express.Router();

// Get all gift cards
router.get('/', async (req, res) => {
  try {
    const giftCards = await GiftCard.find();
    res.render('admin', { giftCards });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// ✅ FIXED: Delete gift card route using router
router.delete('/delete-card/:id', async (req, res) => {
  try {
    const result = await GiftCard.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
