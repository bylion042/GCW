const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    termsAccepted: { type: Boolean, required: true }, // Stores checkbox value
    createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);
module.exports = User 
