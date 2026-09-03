import { useState } from 'react';

export default function ImageComponent({ src, alt, initialLikes = 0 }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <figure style={{ margin: 0, position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <img
        src={src || "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"}
        alt={alt || "Post dish image"}
        style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
      />
      <button
        onClick={toggleLike}
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          background: liked ? '#D9653B' : 'rgba(255,255,255,0.9)',
          color: liked ? '#ffffff' : '#D9653B',
          border: 'none',
          borderRadius: '50px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      >
        <span>{liked ? '♥' : '♡'}</span>
        <span>{likes}</span>
      </button>
    </figure>
  );
}
