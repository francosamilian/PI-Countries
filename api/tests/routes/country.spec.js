/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');
const request = require('supertest')
// const agent = session(app);

describe('Country routes', () => {
  beforeAll(async () => {
    await conn.sync({force: true});
  });

  describe('GET /countries', () => {
    it('should reply the GET method with status code 201', async () => {
      const res = await request(app).get('/countries');
      expect(res.statusCode).toBe(201);
    });
  });

  describe('POST /activities', () => {
    it('should reply the POST method with status code 201 if the data is sent correctly', async () => {
      const res = await request(app).post('/activities').send({name: 'Surf', duration: '1 hour', seasons: ['Summer'], difficulty: 4, country: ['Argentina']});
      expect(res.statusCode).toBe(201);
    });
    it('should reply the POST method with status code 404 if the data is not sent correctly', async () => {
      const res = await request(app).post('/activities').send({name: 'Surf', duration: '1 hour'});
      expect(res.statusCode).toBe(404);
    });
  });
});

