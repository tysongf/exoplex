const request = require('supertest');
const api = require('../api');

describe('Test GET /launches', () => {
   test('It should respond with 200 success', async () => {
      const response = await request(api)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200)
   })
});

describe('Test POST /launches', () => {

   const completeLaunchData = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701 D',
      target: 'Kepler-186 f',
      launchDate: 'April 1, 2030'
   }
   const completeLaunchDataWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701 D',
      target: 'Kepler-186 f'
   }
   const completeLaunchDataWithInvalidDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701 D',
      target: 'Kepler-186 f',
      launchDate: 'potato'
   }

   test('It should respond with 201 created', async () => {
      const response = await request(api)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);

      expect(response.body).toMatchObject(completeLaunchDataWithoutDate);

   });

   test('It should catch missing required properties', async () => {
      const response = await request(api)
      .post('/launches')
      .send(completeLaunchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

      expect(response.body).toStrictEqual({error: 'Missing required launch property'});
   });

   test('It should catch invalid dates', async () => {
      const response = await request(api)
      .post('/launches')
      .send(completeLaunchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400);

      expect(response.body).toStrictEqual({error: 'Invalid launch date.'});
   });
});
