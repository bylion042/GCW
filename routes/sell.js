const express = require('express');
const router = express.Router();
const GiftCard = require('../models/GiftCard');
const upload = require('../config/multerConfig'); 
const sendGiftCardNotification = require('../utils/sendEmail'); 
const GiftCardRate = require('../models/GiftCardRate')

router.post('/sell', upload.array('images', 2), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => '/uploads/' + file.filename);

    const newCard = new GiftCard({
      cardType: req.body.cardType,
      cardBrand: req.body.cardBrand,
      currency: req.body.currency,
      amount: req.body.amount,
      code: req.body.code,
      country: req.body.country,
      imagePaths
    });

    await newCard.save();
    await sendGiftCardNotification();

    // 🔥 Fetch rates so you can render them again
    const rates = await GiftCardRate.find({});

    res.render('sell', {
      user: req.session.user,
      rates: rates,  // ✔️ Now 'rates' is defined again
      status: 'success'
    });

  } catch (err) {
    console.error('Error saving gift card:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
