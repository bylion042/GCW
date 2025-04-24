const express = require('express');
const router = express.Router();
const GiftCard = require('../models/GiftCard');
const upload = require('../config/multerConfig'); // correctly imported
const sendGiftCardNotification = require('../utils/sendEmail'); // ✅ Added line

router.post('/sell', upload.array('images', 2), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => '/uploads/' + file.filename);

    const newCard = new GiftCard({
      cardType: req.body.cardType,
      cardBrand: req.body.cardBrand,
      currency: req.body.currency,
      amount: req.body.amount,
      code: req.body.code,
      imagePaths
    });

    await newCard.save();
    await sendGiftCardNotification(); // ✅ Email notification after save
    res.render('sell', { status: 'success' }); // Pass status to EJS
  } catch (err) {
    console.error('Error saving gift card:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
