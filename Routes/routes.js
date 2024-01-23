const express = require('express');
const User = require('../Model/model.js');
const router = express.Router();
const QRCode = require('qrcode'); // Import the QRCode library
//const router = express.Router();


const activeSessions = {};
router.post('/login', async (req, res) => {
  const { mobileNumber } = req.body;
  if (!mobileNumber) {
    return res.status(400).json({ error: 'Mobile number is required' });
  }

  try {
    let user = await User.findOne({ mobileNumber });

    if (!user) {
      // If user doesn't exist, create a new user
      const authToken = generateAuthToken();
      user = new User({ mobileNumber, authToken });
      await user.save();
    }

    const { authToken } = user;

    // Store the authentication token with the user's mobile number
    activeSessions[mobileNumber] = authToken;

    // Generate QR code URL with the authentication token
    const qrCodeURL = await generateQRCode(authToken);

    res.json({ authToken, qrCodeURL });
    //throw new Error('Something went wrong'); // Replace with your specific error

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to generate a secure authentication token (implement your own logic)
function generateAuthToken() {
  // Generate a random token, you may use libraries like jsonwebtoken for real-world scenarios
  return Math.random().toString(36).substr(2);
}

// Function to generate QR code
async function generateQRCode(data) {
  const qrCodeURL = await QRCode.toDataURL(data);
  return qrCodeURL;
}

module.exports = router;
