const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    
  },
  authToken: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('inspire', userSchema);

module.exports = User;
