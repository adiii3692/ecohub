const request = require('supertest');
const app = require('../index.js');

describe('API GET Endpoint Testing', () => {
  it('should return 200 for GET /challenge', async () => {
    const res = await request(app).get('/challenge');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('challenges');
  });

  it('should return 200 for GET /leaderboard', async () => {
    const res = await request(app).get('/leaderboard');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('leaderboard');
  });

  it('should return 200 for GET /products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('products');
  });
});
