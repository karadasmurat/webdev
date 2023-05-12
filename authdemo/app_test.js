const express = require('express');

const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({
    extended: true
}));

// Your route handlers...
app.post('/example', (req, res) => {
    res.send(req.body);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});