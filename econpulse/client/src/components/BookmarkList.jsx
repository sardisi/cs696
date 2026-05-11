import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookmarkList() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch('/api/bookmarks')
      .then(res => res.json())
      .then(setBookmarks);
  }, []);

  if (bookmarks.length === 0) return <p>No bookmarks yet. Go to Dashboard to add some.</p>;

  return (
    <div>
      <h2>Bookmarks</h2>
      {bookmarks.map(b => (
        <div key={b._id} className="card" style={{ marginBottom: '0.8rem' }}>
          <div className="bookmark-item">
            <Link to={`/bookmarks/${b._id}`}>
              <strong>{b.title}</strong> &mdash; {b.latestValue} {b.units}
            </Link>
            <span className="meta">{b.notes ? b.notes.slice(0, 50) : ''}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookmarkList;
