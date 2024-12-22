const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Plain text password
});

const User = mongoose.model('User', userSchema);

module.exports = User;
