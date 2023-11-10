const User = require('../models/user.model')

exports.test1 = async(req, res) => {
    try {
        
        return res.status(200).json({
            msg:"success",
            data:[]
        })
    } catch (err) {
        return res.status(400).json({
            msg:"error",
            error:err.message
        })
    }
};
  
exports.test2 = async(req, res) => {
    try {
        
        return res.status(200).json({
            msg:"success",
            data:[]
        })
    } catch (err) {
        return res.status(400).json({
            msg:"error",
            error:err.message
        })
    }
};