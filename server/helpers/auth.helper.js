const jwt = require('jsonwebtoken');

exports.generateToken=async(user)=>{
    const payload = {
      sub: user._id, // The user's ID (you may use a unique identifier)
      email: user.email,
    };
  
    // Sign the token with a secret key (keep this secret)
    const token = await jwt.sign(payload, process.env.APPSECRET , { expiresIn: '100h' }); // You should store the secret key securely
  
    return token;
  }
