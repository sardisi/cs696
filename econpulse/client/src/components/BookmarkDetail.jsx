import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookmarkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState(null);
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetch(`/api/bookmarks/${id}`)
      .then(res => res.json())
      .then(data => { setBookmark(data); setNotes(data.notes || ''); });
  }, [id]);

  const saveNotes = async () => {
    const res = await fetch(`/api/bookmarks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    });
    const updated = await res.json();
    setBookmark(updated);
    setEditing(false);
  };

  const remove = async () => {
    if (!window.confirm('Delete this bookmark?')) return;
    await fetch(`/api/bookmarks/${id}`, { method: 'DELETE' });
    navigate('/bookmarks');
  };

  if (!bookmark) return <p>Loading...</p>;

  return (
    <div className="card">
      <h2>{bookmark.title}</h2>
      <p className="meta">{bookmark.seriesId} &middot; {bookmark.frequency} &middot; {bookmark.units}</p>
      <div className="value">{bookmark.latestValue}</div>
      <p className="meta">Latest: {bookmark.latestDate}</p>

      <h3 style={{ marginTop: '1rem' }}>Observations</h3>
      <table>
        <thead><tr><th>Date</th><th>Value</th></tr></thead>
        <tbody>
          {bookmark.observations.map(obs => (
            <tr key={obs.date}><td>{obs.date}</td><td>{obs.value}</td></tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '1rem' }}>Notes</h3>
      {editing ? (
        <div>
          <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
          <div className="actions">
            <button onClick={saveNotes}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <p>{bookmark.notes || 'No notes.'}</p>
          <button onClick={() => setEditing(true)} style={{ marginTop: '0.5rem' }}>Edit Notes</button>
        </div>
      )}

      <div className="actions">
        <button className="delete-btn" onClick={remove}>Delete Bookmark</button>
      </div>
    </div>
  );
}

export default BookmarkDetail;
