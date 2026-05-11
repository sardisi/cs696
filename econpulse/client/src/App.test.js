import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import IndicatorCard from './components/IndicatorCard';
import BookmarkList from './components/BookmarkList';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  );
});

afterEach(() => jest.restoreAllMocks());

test('App renders without crashing', () => {
  render(<App />);
  expect(screen.getByText('EconPulse')).toBeInTheDocument();
});

test('IndicatorCard renders title and value', () => {
  const indicator = {
    seriesId: 'UNRATE', title: 'Unemployment Rate',
    latestValue: '3.7', units: 'Percent', latestDate: '2024-01-01'
  };
  render(
    <MemoryRouter>
      <IndicatorCard indicator={indicator} />
    </MemoryRouter>
  );
  expect(screen.getByText('Unemployment Rate')).toBeInTheDocument();
  expect(screen.getByText('3.7')).toBeInTheDocument();
});

test('BookmarkList shows empty state', async () => {
  render(
    <MemoryRouter>
      <BookmarkList />
    </MemoryRouter>
  );
  const msg = await screen.findByText(/no bookmarks yet/i);
  expect(msg).toBeInTheDocument();
});

test('IndicatorCard shows bookmark button', () => {
  const indicator = {
    seriesId: 'GDP', title: 'GDP',
    latestValue: '100', units: 'Billions', latestDate: '2024-01-01'
  };
  render(
    <MemoryRouter>
      <IndicatorCard indicator={indicator} />
    </MemoryRouter>
  );
  expect(screen.getByText('Bookmark')).toBeInTheDocument();
});
