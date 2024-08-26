const express = require('express');
const app = express();

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the payment system');
});

// Cart route with ID validation
app.get('/cart/:id(\\d+)', (req, res) => {
    const id = req.params.id;
    res.send(`Payment methods for cart ${id}`);
});

// Handle 404 for invalid routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

const port = 7865;
app.listen(port, () => {
    console.log(`API available on localhost port ${port}`);
});
