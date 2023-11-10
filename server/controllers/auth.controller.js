const bcrypt = require('bcrypt');
const User = require('../models/user.model')
const {generateToken} = require('../helpers/auth.helper')


exports.login = async(req, res) => {
    try {
        const user = await User.findOne({ email:req.body.email });
        if (!user) {
            return res.status(401).json({ 
                msg:"error",
                error:"Invalid credentials!"
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ 
                msg:"error",
                error:"Invalid credentials!"
            });
        }

        // Generate and send a JWT token for authentication
        const token = await generateToken(user);

        return res.status(200).json({
            msg:"success",
            user:user,
            token:token
        })
    } catch (err) {
        return res.status(400).json({
            msg:"error",
            error:err.message
        })
    }
};
  
exports.register = async(req, res) => {
    try {
        const existingUser = await User.findOne({ email:req.body.email });
        if (existingUser) {
            return res.status(400).json({
                msg:"error",
                error:"User with this email already exists!"
            })
        }

        // Create a new user
        const user = new User(req.body);
        await user.save();
        return res.status(200).json({
            msg:"success",
            data:user
        })
    } catch (err) {
        return res.status(400).json({
            msg:"error",
            error:err.message
        })
    }
};