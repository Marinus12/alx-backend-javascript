const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the payment system');
});

// Cart route with ID validation
app.get('/cart/:id(\\d+)', (req, res) => {
    const id = req.params.id;
    res.send(`Payment methods for cart ${id}`);
});

// Endpoint to get available payment methods
app.get('/available_payments', (req, res) => {
    res.json({
        payment_methods: {
            credit_cards: true,
            paypal: false
        }
    });
});

// Endpoint to handle user login
app.post('/login', (req, res) => {
    const { userName } = req.body;
    if (userName) {
        res.send(`Welcome ${userName}`);
    } else {
        res.status(400).send('Missing userName');
    }
});

// Handle 404 for invalid routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

const port = 7865;
app.listen(port, () => {
    console.log(`API available on localhost port ${port}`);
});
