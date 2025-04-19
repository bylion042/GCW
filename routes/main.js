const express = require('express');
const router = express.Router();
const moment = require('moment');
const GiftCardRate = require('../models/GiftCardRate');
const GiftCard = require('../models/GiftCard');

// Landing Page
router.get('/', async (req, res) => {
    try {
      const rates = await GiftCardRate.find(); // Fetch rates from DB
      res.render('index', { rates }); // Pass rates to index.ejs
    } catch (error) {
      console.error("Error fetching rates:", error);
      res.status(500).send("Error fetching rates");
    }
  });
  
// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
  const referredBy = req.session.referredBy || null;
  res.render('register', { referredBy });
});

// Handle Register Form Submission
router.post('/register', async (req, res) => {
  const { name, email, password, phone, agreedToTerms } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const referredBy = req.session.referredBy || null;

  const newUser = new User({
    name,
    email,
    phone,
    password: hashedPassword,
    agreedToTerms,
    referredBy,
    balance: 0
  });

  await newUser.save();

  // Reward referrer $2
  if (referredBy) {
    const referrer = await User.findOne({ username: referredBy });
    if (referrer) {
      referrer.balance = (referrer.balance || 0) + 2;
      await referrer.save();
    }
  }

  req.session.referredBy = null; // Clear after use
  req.session.user = newUser;
  res.redirect('/account');
});


// Dashboard Page (Protected)
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('dashboard', { user: req.session.user });
});

// Order Page (Protected)
router.get('/order', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('order', { user: req.session.user });
});

// Account Page (Protected)
router.get('/account', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const user = req.session.user;

    // Format the registration date using moment.js
    const registrationDate = moment(user.createdAt).format('MMM DD, YYYY - hh:mm:ss A');

    // Render the account page and pass user info, registrationDate
    res.render('account', { user, registrationDate });
});

// message Page (Protected)
router.get('/message', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('message', { user: req.session.user });
});

// message Page (Protected)
router.get('/mine', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('mine', { user: req.session.user });
});


// SELL Page (Protected)
router.get('/sell', (req, res) => {
    // Check if user is logged in (based on session)
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login if user is not logged in
    }

    // Render sell page with the user session and any query parameters (like status)
    res.render('sell', { 
        user: req.session.user, 
        status: req.query.status  // Pass the status from the query parameters (success/failure)
    });
});

// SELECT CARD Page (Protected)
router.get('/select-card', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        // Fetch all gift card rates from the database
        const rates = await GiftCardRate.find();

        // Map brand names to corresponding image filenames stored in the public/images folder
      const brandImageMap = {
            'Amazon': 'giftcard13.jpeg',
            'Razer': 'giftcard16.jpeg',
            'Sephora': 'giftcard17.jpeg',
            'Google': 'giftcard12.jpeg',
            'Apple&iTunes': 'giftcard3.jpeg',
            'Footlocker': 'giftcard15.jpeg',
            'Steam': 'giftcard2.jpeg',
            'Nike': 'giftcard6.jpeg',
            'Xbox': 'giftcard1.jpeg',
            'Walmart': 'giftcard14.jpeg',
            'Vanilla': 'giftcard18.jpeg',
            'AMEX': 'giftcard19.jpeg',
            'Mastercard': 'giftcard20.jpeg',
            'Nordstrom': 'giftcard21.jpeg',
            'eBay': 'giftcard22.jpeg',
            'PayStation': 'giftcard23.jpeg',
            'Netspend': 'giftcard24.jpeg',
            'GameStop': 'giftcard25.jpeg',
            'Paysafecard': 'giftcard26.jpeg',
            'Moneycard': 'giftcard27.jpeg',
            'BestBuy': 'giftcard28.jpeg',
            'CVS': 'giftcard29.jpeg',
            'Roblox': 'giftcard30.jpeg',
            'Macy\'s': 'giftcard31.jpeg',
            'VISA': 'giftcard32.jpeg'
        };


        // Render the select-card page with the rates and brandImageMap
        res.render('select-card', { user: req.session.user, rates, brandImageMap });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch gift card rates');
    }
});



// Calculator route
router.get('/calculator', async (req, res) => {
  try {
    const rates = await GiftCardRate.find(); // Fetch the rates from your database
    res.render('calculator', { rates }); // Pass the rates to the view
  } catch (error) {
    console.error("Error fetching rates:", error);
    res.status(500).send("Error fetching rates");
  }
});




// Render PASSCODE page
router.get('/passcode', (req, res) => {
  res.render('passcode');
});


// Admin Page (render gift cards and count)
router.get('/admin', async (req, res) => {
  try {
    const giftCards = await GiftCard.find().sort({ createdAt: -1 });
    const giftCardCount = giftCards.length;

    res.render('admin', {
      giftCards,
      giftCardCount
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading admin page');
  }
});




// Render update-rate page
router.get('/update-rate', async (req, res) => {
  try {
    // Fetch all rates from the GiftCardRate model
    const rates = await GiftCardRate.find();
    const brands = rates.map(r => r.brand); // Get all brands

    // Count the number of gift cards
    const giftCardCount = await GiftCard.countDocuments();

    // Render the update-rate page with brands and giftCardCount
    res.render('update-rate', { brands, giftCardCount });
  } catch (err) {
    console.error("Error fetching rates or gift card count:", err);
    res.status(500).send("Server error");
  }
});

// Handle the update form submission
router.post('/update-rate', async (req, res) => {
  const { brand, rateUSD } = req.body;
  try {
    // Update the rate in the database
    await GiftCardRate.findOneAndUpdate({ brand }, { rateUSD });

    // Redirect back to the update-rate page after successful update
    res.redirect('/update-rate');
  } catch (err) {
    console.error("Error updating rate:", err);
    res.status(500).send("Error updating the rate");
  }
});


  

// Admin Page
  // Passcode Check Endpoint
  router.post('/check-passcode', (req, res) => {
    const { passcode } = req.body;
    if (passcode === process.env.ADMIN_PASSCODE) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });


  // FOR REFERAL CODES 
  router.get('/ref/:username', (req, res) => {
    const { username } = req.params;
  
    // Save referrer in session
    req.session.referredBy = username;
  
    // Redirect to signup or homepage
    res.redirect('/register'); // Or '/signup', or even '/' if you want
  });
  
  



// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;
