import { useState, useEffect } from 'react';
import IndicatorCard from './IndicatorCard';
import SearchBar from './SearchBar';

function PulseBoard() {
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pulse')
      .then(res => res.json())
      .then(data => { setIndicators(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading indicators...</p>;

  return (
    <div>
      <SearchBar />
      <div className="grid">
        {indicators.map(ind => (
          <IndicatorCard key={ind.seriesId} indicator={ind} />
        ))}
      </div>
    </div>
  );
}

export default PulseBoard;
