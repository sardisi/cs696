const request = require('supertest');
const mongoose = require('mongoose');
const fred = require('../src/services/fred');
const Bookmark = require('../src/models/Bookmark');

jest.mock('../src/services/fred');

const app = require('../src/app');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/econpulse-test');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  await Bookmark.deleteMany();
});

beforeEach(() => {
  fred.getSeriesMetadata.mockResolvedValue({
    title: 'Unemployment Rate', frequency: 'Monthly', units: 'Percent'
  });
  fred.getObservations.mockResolvedValue([
    { date: '2024-01-01', value: '3.7' }
  ]);
});

test('POST creates bookmark', async () => {
  const res = await request(app)
    .post('/api/bookmarks')
    .send({ seriesId: 'UNRATE' });
  expect(res.status).toBe(201);
  expect(res.body.seriesId).toBe('UNRATE');
  expect(res.body.title).toBe('Unemployment Rate');
});

test('POST without seriesId returns 400', async () => {
  const res = await request(app)
    .post('/api/bookmarks')
    .send({});
  expect(res.status).toBe(400);
});

test('GET / returns array', async () => {
  await Bookmark.create({ seriesId: 'GDP', title: 'GDP' });
  const res = await request(app).get('/api/bookmarks');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('GET /:id returns bookmark', async () => {
  const doc = await Bookmark.create({ seriesId: 'GDP', title: 'GDP' });
  const res = await request(app).get(`/api/bookmarks/${doc._id}`);
  expect(res.status).toBe(200);
  expect(res.body.seriesId).toBe('GDP');
});

test('GET /:id returns 404', async () => {
  const fakeId = new mongoose.Types.ObjectId();
  const res = await request(app).get(`/api/bookmarks/${fakeId}`);
  expect(res.status).toBe(404);
});

test('PUT updates notes', async () => {
  const doc = await Bookmark.create({ seriesId: 'GDP', title: 'GDP' });
  const res = await request(app)
    .put(`/api/bookmarks/${doc._id}`)
    .send({ notes: 'updated' });
  expect(res.status).toBe(200);
  expect(res.body.notes).toBe('updated');
});

test('DELETE removes bookmark', async () => {
  const doc = await Bookmark.create({ seriesId: 'GDP', title: 'GDP' });
  const res = await request(app).delete(`/api/bookmarks/${doc._id}`);
  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
  const found = await Bookmark.findById(doc._id);
  expect(found).toBeNull();
});
