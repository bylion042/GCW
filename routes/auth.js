const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import User model
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword, phone, terms, referredBy } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.render('register', {
            message: 'Passwords do not match',
            messageType: 'error',
            referredBy // Pass referredBy value here
        });
    }

    // Ensure terms are accepted
    if (!terms) {
        return res.render('register', {
            message: 'You must accept the Terms and Conditions.',
            messageType: 'error',
            referredBy // Pass referredBy value here
        });
    }

    try {
        // Check if user already exists by email
        let user = await User.findOne({ email });
        if (user) {
            return res.render('register', {
                message: 'User already exists with this email.',
                messageType: 'error',
                referredBy // Pass referredBy value here
            });
        }

        // Check if user already exists by phone number
        let phoneExists = await User.findOne({ phone });
        if (phoneExists) {
            return res.render('register', {
                message: 'This phone number has been used.',
                messageType: 'error',
                referredBy // Pass referredBy value here
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            termsAccepted: true,  // Store accepted terms as true
            referredBy // Add referral information to the new user
        });

        await user.save();

        // Store user in session and redirect to dashboard
        req.session.user = user;
        res.redirect('/dashboard');  // Redirect to the dashboard
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});






// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', {
                message: 'Invalid email or password',
                messageType: 'error'
            });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', {
                message: 'Invalid email or password',
                messageType: 'error'
            });
        }

        // Store user in session and redirect
        req.session.user = user;
        res.redirect('/dashboard'); // Redirect to dashboard
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
