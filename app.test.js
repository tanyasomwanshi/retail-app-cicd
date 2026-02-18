const request = require('supertest');
const app = require('./index');

describe('Retail App API', () => {
  
  // Test 1: Check Products
  it('GET /products - should return all products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(3);
  });

  // Test 2: Check Specific Product
  it('GET /products/1 - should return specific product details', async () => {
    const res = await request(app).get('/products/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe('Laptop');
  });

  // Test 3: Check Customers
  it('GET /customers - should return list of customers', async () => {
    const res = await request(app).get('/customers');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test 4: Create an Order
  it('POST /orders - should create a new order', async () => {
    const res = await request(app)
      .post('/orders')
      .send({ customerId: 1, productId: 2 }); // Buying a Phone
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.product).toBe('Phone');
    expect(res.body.total).toBe(599);
  });
});