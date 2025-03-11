const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(__dirname));

// Routes for each section
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
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

// Start the server
app.listen(port, () => {
    console.log(`Portfolio website running at http://localhost:${port}`);
});
