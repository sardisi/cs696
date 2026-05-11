const mongoose = require('mongoose');
const Bookmark = require('../src/models/Bookmark');

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

test('saves bookmark with all fields', async () => {
  const doc = await Bookmark.create({
    seriesId: 'UNRATE', title: 'Unemployment Rate',
    frequency: 'Monthly', units: 'Percent',
    latestValue: '3.7', latestDate: '2024-01-01',
    observations: [{ date: '2024-01-01', value: '3.7' }],
    notes: 'test note'
  });
  expect(doc.seriesId).toBe('UNRATE');
  expect(doc.title).toBe('Unemployment Rate');
  expect(doc.observations).toHaveLength(1);
  expect(doc.createdAt).toBeDefined();
});

test('rejects missing seriesId', async () => {
  await expect(Bookmark.create({ title: 'Test' }))
    .rejects.toThrow(/seriesId/);
});

test('rejects missing title', async () => {
  await expect(Bookmark.create({ seriesId: 'X' }))
    .rejects.toThrow(/title/);
});

test('defaults notes to empty string and observations to []', async () => {
  const doc = await Bookmark.create({ seriesId: 'GDP', title: 'GDP' });
  expect(doc.notes).toBe('');
  expect(doc.observations).toEqual([]);
});
