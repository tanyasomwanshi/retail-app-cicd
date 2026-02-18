const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies (Required for POST requests)
app.use(express.json());

// --- DATA STORE (Simulating a Database) ---
const products = [
  { id: 1, name: 'Laptop', price: 999, description: 'High-performance laptop for devs' },
  { id: 2, name: 'Phone', price: 599, description: 'Latest smartphone with great camera' },
  { id: 3, name: 'Headphones', price: 199, description: 'Noise-cancelling headphones' }
];

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

const orders = []; // Empty list to store orders

// --- ROUTES ---

// 1. Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the Enhanced Retail App!');
});

// 2. Product Routes
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

// 3. Customer Routes
app.get('/customers', (req, res) => {
  res.json(customers);
});

// 4. Order Routes (The complex part!)
app.post('/orders', (req, res) => {
  // Logic: User sends customerId and productId
  const { customerId, productId } = req.body;

  const product = products.find(p => p.id === productId);
  const customer = customers.find(c => c.id === customerId);

  if (!product || !customer) {
    return res.status(400).send('Invalid Customer or Product ID');
  }

  const newOrder = {
    id: orders.length + 1,
    customer: customer.name,
    product: product.name,
    total: product.price,
    date: new Date()
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.get('/orders', (req, res) => {
  res.json(orders);
});

// Export for testing
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Retail app listening at http://localhost:${port}`);
  });
}

module.exports = app;