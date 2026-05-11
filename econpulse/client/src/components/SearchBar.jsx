import { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    if (!query.trim()) return;
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    setResults(await res.json());
  };

  const bookmark = async (seriesId, idx) => {
    await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seriesId })
    });
    setResults(prev => prev.map((r, i) => i === idx ? { ...r, saved: true } : r));
  };

  return (
    <div>
      <div className="search-bar">
        <input value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search FRED series..." onKeyDown={e => e.key === 'Enter' && search()} />
        <button onClick={search}>Search</button>
      </div>
      {results.length > 0 && (
        <div className="search-results">
          {results.map((r, i) => (
            <div key={r.seriesId} className="search-item">
              <span><strong>{r.seriesId}</strong> &mdash; {r.title} ({r.frequency})</span>
              <button onClick={() => bookmark(r.seriesId, i)} disabled={r.saved}>
                {r.saved ? 'Saved' : 'Bookmark'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
