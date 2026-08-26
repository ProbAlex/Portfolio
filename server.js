const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes for each section (must come before the static mounts below so that
// e.g. "/home" is served directly instead of being redirected by express.static)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'default/index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home/index.html'));
});

app.get('/skills', (req, res) => {
    res.sendFile(path.join(__dirname, 'skills/index.html'));
});

app.get('/career', (req, res) => {
    res.sendFile(path.join(__dirname, 'career/index.html'));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects/index.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact/index.html'));
});

// Static assets. Only the folders the site actually needs are exposed here -
// note this intentionally excludes server.js, package.json, node_modules, etc.
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/home', express.static(path.join(__dirname, 'home')));
app.use('/skills', express.static(path.join(__dirname, 'skills')));
app.use('/career', express.static(path.join(__dirname, 'career')));
app.use('/projects', express.static(path.join(__dirname, 'projects')));
app.use('/contact', express.static(path.join(__dirname, 'contact')));
app.use('/', express.static(path.join(__dirname, 'default')));

// API endpoint for contact form
app.post('/api/contact', async (req, res) => {
    try {
        // Get webhook URL from webhook.json
        const webhookData = JSON.parse(fs.readFileSync(path.join(__dirname, 'webhook.json'), 'utf8'));
        const webhookUrl = webhookData.discord;
        
        const { name, email, message } = req.body;
        
        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        
        // Format message for Discord
        const discordMessage = {
            embeds: [{
                title: 'New Contact Form Submission',
                color: 0x3b82f6, // Blue color
                fields: [
                    { name: 'Name', value: name, inline: true },
                    { name: 'Email', value: email, inline: true },
                    { name: 'Message', value: message },
                    { name: 'Timestamp', value: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }) }
                ]
            }]
        };
        
        // Send to Discord webhook
        await axios.post(webhookUrl, discordMessage);
        
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Portfolio website running at http://localhost:${port}`);
});
