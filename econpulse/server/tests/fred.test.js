const fred = require('../src/services/fred');

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('getObservations returns correct shape', async () => {
  global.fetch.mockResolvedValue({
    json: async () => ({
      observations: [
        { date: '2024-01-01', value: '3.7' },
        { date: '2023-12-01', value: '3.8' }
      ]
    })
  });
  const result = await fred.getObservations('UNRATE');
  expect(result).toEqual([
    { date: '2024-01-01', value: '3.7' },
    { date: '2023-12-01', value: '3.8' }
  ]);
  expect(global.fetch).toHaveBeenCalledTimes(1);
});

test('getSeriesMetadata returns correct shape', async () => {
  global.fetch.mockResolvedValue({
    json: async () => ({
      seriess: [{ title: 'Unemployment Rate', frequency: 'Monthly', units: 'Percent' }]
    })
  });
  const result = await fred.getSeriesMetadata('UNRATE');
  expect(result).toEqual({
    title: 'Unemployment Rate', frequency: 'Monthly', units: 'Percent'
  });
});

test('searchSeries maps id to seriesId', async () => {
  global.fetch.mockResolvedValue({
    json: async () => ({
      seriess: [{ id: 'UNRATE', title: 'Unemployment', frequency: 'Monthly', units: 'Percent' }]
    })
  });
  const result = await fred.searchSeries('unemployment');
  expect(result[0].seriesId).toBe('UNRATE');
  expect(result[0].title).toBe('Unemployment');
});
