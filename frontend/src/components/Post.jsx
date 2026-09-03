import { useState } from 'react';
import EditPost from './EditPost';

export default function Post({ post, onUpdatePost }) {
  const [isEditing, setIsEditing] = useState(false);

  if (!post) {
    return <p>Post not found.</p>;
  }

  const handleSave = (updatedData) => {
    if (onUpdatePost) {
      onUpdatePost(updatedData);
    }
    setIsEditing(false);
  };

  return (
    <article style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
      {isEditing ? (
        <EditPost post={post} onSave={handleSave} onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', color: 'var(--text-primary)' }}>{post.title}</h1>
              <span style={{ display: 'inline-block', backgroundColor: '#FFE8D6', color: '#D9653B', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                {post.tag || "#Food"}
              </span>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline"
              style={{ fontSize: '0.85rem', padding: '6px 14px' }}
            >
              Edit Post
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '1rem 0' }}>
            {post.authorAvatar && (
              <img src={post.authorAvatar} alt={post.author} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
            )}
            <div>
              <span style={{ fontWeight: 600, display: 'block' }}>{post.author || "chef"}</span>
              <small style={{ color: 'var(--text-secondary)' }}>{post.date || "Today"}</small>
            </div>
          </div>

          <div style={{ margin: '1rem 0' }}>
            <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
              Description
            </h4>
            <p style={{ margin: 0, lineHeight: 1.6 }}>{post.description}</p>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#FDFBF7', borderLeft: '4px solid var(--primary-color)', borderRadius: '4px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)', fontSize: '1rem' }}>Chef's Review & Notes</h4>
            <p style={{ margin: 0, fontStyle: 'italic', lineHeight: 1.6, color: 'var(--text-primary)' }}>
              "{post.review || 'An extraordinary recipe packed with deep flavors.'}"
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
