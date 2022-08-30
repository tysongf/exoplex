const request = require('supertest');
const api = require('../api');

describe('Test GET /launches', () => {
   test('It should respond with 200 success', async () => {
      const response = await request(api).get('/launches');
      expect(response.statusCode).toBe(200);
   })
});

describe('Test POST /launches', () => {
   test('It should respond with 200 success', () => {
      const response = 200;
   });
   test('It should catch missing required properties', () => {

   });
   test('It should catch invalid dates', () => {

   });
});
