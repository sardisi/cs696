const request = require('supertest');
const fred = require('../src/services/fred');

jest.mock('../src/services/fred');

const app = require('../src/app');

test('returns results for valid query', async () => {
  fred.searchSeries.mockResolvedValue([
    { seriesId: 'UNRATE', title: 'Unemployment', frequency: 'Monthly', units: 'Percent' }
  ]);
  const res = await request(app).get('/api/search?q=unemployment');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].seriesId).toBe('UNRATE');
});

test('returns 400 without q param', async () => {
  const res = await request(app).get('/api/search');
  expect(res.status).toBe(400);
});
