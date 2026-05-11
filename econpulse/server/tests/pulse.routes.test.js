const request = require('supertest');
const fred = require('../src/services/fred');

jest.mock('../src/services/fred');

const app = require('../src/app');

beforeEach(() => {
  fred.getSeriesMetadata.mockResolvedValue({
    title: 'Unemployment Rate', frequency: 'Monthly', units: 'Percent'
  });
  fred.getObservations.mockResolvedValue([
    { date: '2024-01-01', value: '3.7' }
  ]);
});

test('GET /api/pulse returns array of 5 indicators', async () => {
  const res = await request(app).get('/api/pulse');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(5);
  expect(res.body[0]).toHaveProperty('seriesId');
  expect(res.body[0]).toHaveProperty('title');
  expect(res.body[0]).toHaveProperty('latestValue');
});

test('returns 502 if FRED fails', async () => {
  fred.getSeriesMetadata.mockRejectedValue(new Error('FRED down'));
  const res = await request(app).get('/api/pulse');
  expect(res.status).toBe(502);
});
