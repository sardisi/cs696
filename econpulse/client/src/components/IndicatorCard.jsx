import { useState } from 'react';

function IndicatorCard({ indicator }) {
  const [saved, setSaved] = useState(false);

  const bookmark = async () => {
    await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seriesId: indicator.seriesId })
    });
    setSaved(true);
  };

  return (
    <div className="card">
      <h3>{indicator.title}</h3>
      <div className="value">{indicator.latestValue}</div>
      <div className="meta">{indicator.seriesId} &middot; {indicator.units}</div>
      <div className="meta">{indicator.latestDate}</div>
      <button onClick={bookmark} disabled={saved} style={{ marginTop: '0.8rem' }}>
        {saved ? 'Bookmarked' : 'Bookmark'}
      </button>
    </div>
  );
}

export default IndicatorCard;
