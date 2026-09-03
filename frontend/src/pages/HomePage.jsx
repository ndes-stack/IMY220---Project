import { useState } from 'react';
import Feed from '../components/Feed';
import SearchInput from '../components/SearchInput';
import CreatePost from '../components/CreatePost';
import { dummyPosts as initialPosts } from '../data/dummyData';

export default function HomePage() {
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Discover Banner */}
      <section
        style={{
          borderRadius: '16px',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          marginBottom: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}
      >
        <h1 style={{ fontSize: '3.2rem', margin: 0, fontWeight: 800, letterSpacing: '-0.02em' }}>Discover</h1>
        <p style={{ fontSize: '1.25rem', margin: '0.5rem 0 0 0', opacity: 0.95 }}>today's picks from top home cooks</p>
      </section>

      {/* Search Bar */}
      <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      {/* Create Post Component Form */}
      <CreatePost onPostCreated={handlePostCreated} />

      {/* Feed Component listing posts */}
      <Feed posts={filteredPosts} />
    </main>
  );
}
