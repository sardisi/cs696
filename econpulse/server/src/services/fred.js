const API_KEY = process.env.FRED_API_KEY;
const BASE = 'https://api.stlouisfed.org/fred';

function url(path, params = {}) {
  const query = new URLSearchParams({
    api_key: API_KEY, file_type: 'json', ...params
  });
  return `${BASE}/${path}?${query}`;
}

async function getObservations(seriesId) {
  const res = await fetch(url('series/observations', {
    series_id: seriesId, sort_order: 'desc', limit: 10
  }));
  const data = await res.json();
  return data.observations.map(obs => ({ date: obs.date, value: obs.value }));
}

async function getSeriesMetadata(seriesId) {
  const res = await fetch(url('series', { series_id: seriesId }));
  const data = await res.json();
  const series = data.seriess[0];
  return { title: series.title, frequency: series.frequency, units: series.units };
}

async function searchSeries(query) {
  const res = await fetch(url('series/search', {
    search_text: query, limit: 10
  }));
  const data = await res.json();
  return data.seriess.map(series => ({
    seriesId: series.id, title: series.title,
    frequency: series.frequency, units: series.units
  }));
}

module.exports = { getObservations, getSeriesMetadata, searchSeries };
