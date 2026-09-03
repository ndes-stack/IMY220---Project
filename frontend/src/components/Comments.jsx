import { useState } from 'react';

export default function Comments({ comments = [], onAddComment }) {
  const [commentList, setCommentList] = useState(comments);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !reviewerName.trim()) {
      setError('Please fill in your name, comment title, and message.');
      return;
    }
    setError('');

    const newComment = {
      id: Date.now(),
      title,
      body,
      author: reviewerName,
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      date: "Just now"
    };

    setCommentList([newComment, ...commentList]);
    if (onAddComment) onAddComment(newComment);
    setTitle('');
    setBody('');
    setReviewerName('');
  };

  return (
    <section style={{ marginTop: '2.5rem' }}>
      <h3 style={{ fontSize: '1.4rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
        Comments ({commentList.length})
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
        {commentList.map((c) => (
          <article
            key={c.id}
            style={{
              padding: '1.2rem',
              backgroundColor: 'var(--card-bg)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 0.4rem 0', color: 'var(--primary-color)', fontSize: '1.05rem' }}>{c.title}</h4>
              <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{c.body}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid #f0f0f0', paddingTop: '0.6rem' }}>
              {c.authorAvatar && (
                <img src={c.authorAvatar} alt={c.author} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
              )}
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block' }}>{c.author}</strong>
                <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{c.date}</small>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <h4 style={{ margin: '0 0 1rem 0' }}>Leave a Review / Comment</h4>
        {error && <div style={{ color: '#D90429', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <input
            type="text"
            placeholder="Your Name (e.g. food_lover)"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Review Title (e.g. Delicious pasta!)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows={3}
            placeholder="Write your review or comment..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }}>Post Comment</button>
        </form>
      </div>
    </section>
  );
}
