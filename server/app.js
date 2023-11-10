const express = require('express')
const helmet = require('helmet')
const app = express()

app.use(express.json()); // Parse JSON requests
app.use(helmet())
const PORT = process.env.PORT || 3000

// Use the authentication routes
app.use('/auth', require('./routes/auth.route'));
app.use('/user', require('./routes/user.route'));


const { google } = require('googleapis');
const auth = require('./config.json'); // Path to the JSON key file
const authClient = new google.auth.JWT({
    email: auth.client_email,
    key: auth.private_key,
    scopes: ['https://www.googleapis.com/auth/adsense.readonly'],
});
const adsense = google.adsense('v1.4');
app.get('/adsense', async(req, res) => {
    try {
        // Call the function
        const response = await adsense.accounts.get({
            auth: authClient,
            accountId: auth.accountId, // Replace with your AdSense account ID
        });
      
        console.log('AdSense Account Info:', response.data);
        return res.status(200).json({
            msg:"success",
            data:response.data
        })        
    } catch (err) {
        return res.status(400).json({
            msg:"error",
            error:err.message
        })
    }
});

app.get('/', async(req, res) => {
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
});

app.listen(PORT,()=>{
    console.log('server is up and running on port:'+PORT)
})