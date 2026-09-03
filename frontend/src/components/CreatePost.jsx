import { useState } from 'react';

export default function CreatePost({ onPostCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [review, setReview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      setError('Dish title must be at least 3 characters.');
      return;
    }
    if (description.trim().length < 5) {
      setError('Please provide a description of at least 5 characters.');
      return;
    }

    setError('');
    const newPost = {
      id: Date.now(),
      title,
      tag: tag.startsWith('#') ? tag : `#${tag || 'Food'}`,
      description,
      review: review || "A flavorful and satisfying creation.",
      image: imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      author: "pasta_maestro",
      authorAvatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80",
      likes: 1,
      date: "Just now",
      comments: []
    };

    if (onPostCreated) {
      onPostCreated(newPost);
    }

    setSuccess('Post created successfully!');
    setTimeout(() => {
      setTitle('');
      setTag('');
      setDescription('');
      setReview('');
      setImageUrl('');
      setSuccess('');
      setIsOpen(false);
    }, 1200);
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn"
          style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}
        >
          + Create New Dish Post
        </button>
      ) : (
        <div style={{ padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>Share a New Dish</h3>
            <button onClick={() => setIsOpen(false)} className="btn btn-outline" style={{ padding: '4px 10px', fontSize: '0.85rem' }}>Close</button>
          </div>

          {error && <div style={{ color: '#D90429', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{error}</div>}
          {success && <div style={{ color: '#2B9348', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{success}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <input
              type="text"
              placeholder="Dish Name (e.g., Truffle Gnocchi)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Tags (e.g., #Italian #Homemade)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <input
              type="url"
              placeholder="Image URL (optional, or uses delicious default photo)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <textarea
              placeholder="Brief description of the dish..."
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <textarea
              placeholder="Your review, tasting notes, or recipe tips..."
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button type="submit" className="btn" style={{ marginTop: '0.5rem' }}>Publish Post</button>
          </form>
        </div>
      )}
    </div>
  );
}
