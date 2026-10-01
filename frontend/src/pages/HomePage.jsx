// frontend/src/pages/HomePage.jsx
import { useState, useEffect, useCallback } from 'react';
import Feed from '../components/Feed';
import SearchInput from '../components/SearchInput';
import CreatePost from '../components/CreatePost';
import ProfilePreview from '../components/ProfilePreview';
import api from '../api';

export default function HomePage() {
  const [scope, setScope] = useState('global'); // 'global' | 'local'
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chefResults, setChefResults] = useState([]);

  const loadPosts = useCallback(async (nextScope) => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getPosts(nextScope);
      setPosts(data.posts);
    } catch (err) {
      setError(err.message || 'Could not load posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts(scope);
  }, [scope, loadPosts]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setChefResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const data = await api.searchUsers(searchTerm.trim());
        setChefResults(data.users || []);
      } catch (err) {
        setChefResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.tag || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      {/* Discover Banner */}
      <section
        className="rounded-2xl py-14 px-8 text-center text-white mb-8 shadow-md"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="font-display text-5xl m-0 font-extrabold tracking-tight">Discover</h1>
        <p className="text-xl mt-2 opacity-95">today's picks from top home cooks</p>
      </section>

      {/* Local / Global feed tabs */}
      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => setScope('global')}
          className={scope === 'global' ? 'btn px-5 py-2' : 'btn btn-outline px-5 py-2'}
        >
          Global Feed
        </button>
        <button
          onClick={() => setScope('local')}
          className={scope === 'local' ? 'btn px-5 py-2' : 'btn btn-outline px-5 py-2'}
        >
          Friends Feed
        </button>
      </div>

      {/* Search Bar */}
      <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      {/* Chef search results */}
      {chefResults.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-display mb-3">Chefs</h2>
          <div className="flex gap-4 flex-wrap">
            {chefResults.map((chef) => (
              <ProfilePreview key={chef.id} profile={chef} />
            ))}
          </div>
        </section>
      )}

      {/* Create Post Component Form */}
      <CreatePost onPostCreated={handlePostCreated} />

      {error && <p className="text-center text-red-600 mb-4">{error}</p>}
      {loading ? (
        <p className="text-center text-forkful-muted">Loading posts...</p>
      ) : (
        <Feed posts={filteredPosts} />
      )}
    </main>
  );
}