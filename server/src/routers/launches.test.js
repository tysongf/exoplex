const request = require('supertest');
const app = require('../app');
const loadPlanetsData = require('../commands/loadPlanets.command');
const { mongoConnect, mongoDisconnect } = require('../services/mongo.js');

describe('Launches API', () => {

   beforeAll(async () => {
      await mongoConnect();
      await loadPlanetsData();
   });

   describe('Test GET /v1/launches', () => {
      test('It should respond with 200 success', async () => {
         const response = await request(app)
         .get('/v1/launches')
         .expect('Content-Type', /json/)
         .expect(200)
      })
   });
   
   describe('Test POST /v1/launches', () => {
   
      const completeLaunchData = {
         mission: 'USS Enterprise',
         rocket: 'NCC 1701 D',
         target: 'Kepler-442 b',
         launchDate: 'April 1, 2030'
      }
      const completeLaunchDataWithoutDate = {
         mission: 'USS Enterprise',
         rocket: 'NCC 1701 D',
         target: 'Kepler-442 b'
      }
      const completeLaunchDataWithInvalidDate = {
         mission: 'USS Enterprise',
         rocket: 'NCC 1701 D',
         target: 'Kepler-442 b',
         launchDate: 'potato'
      }
   
      test('It should respond with 201 created', async () => {
         const response = await request(app)
         .post('/v1/launches')
         .send(completeLaunchData)
         .expect('Content-Type', /json/)
         .expect(201);
   
         const requestDate = new Date(completeLaunchData.launchDate).valueOf();
         const responseDate = new Date(response.body.launchDate).valueOf();
         expect(requestDate).toBe(responseDate);
   
         expect(response.body).toMatchObject(completeLaunchDataWithoutDate);
   
      });
   
      test('It should catch missing required properties', async () => {
         const response = await request(app)
         .post('/v1/launches')
         .send(completeLaunchDataWithoutDate)
         .expect('Content-Type', /json/)
         .expect(400);
   
         expect(response.body).toStrictEqual({error: 'Missing required launch property'});
      });
   
      test('It should catch invalid dates', async () => {
         const response = await request(app)
         .post('/v1/launches')
         .send(completeLaunchDataWithInvalidDate)
         .expect('Content-Type', /json/)
         .expect(400);
   
         expect(response.body).toStrictEqual({error: 'Invalid launch date.'});
      });
   })
   
   afterAll(async () => {
      await mongoDisconnect();
    });
});
