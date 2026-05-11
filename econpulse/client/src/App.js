import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PulseBoard from './components/PulseBoard';
import BookmarkList from './components/BookmarkList';
import BookmarkDetail from './components/BookmarkDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/" className="nav-brand">EconPulse</Link>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/bookmarks">Bookmarks</Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<PulseBoard />} />
          <Route path="/bookmarks" element={<BookmarkList />} />
          <Route path="/bookmarks/:id" element={<BookmarkDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
