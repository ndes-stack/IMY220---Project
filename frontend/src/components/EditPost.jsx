import { useState } from 'react';

export default function EditPost({ post, onSave, onCancel }) {
  const [title, setTitle] = useState(post?.title || '');
  const [tag, setTag] = useState(post?.tag || '');
  const [description, setDescription] = useState(post?.description || '');
  const [review, setReview] = useState(post?.review || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Title and description cannot be empty.');
      return;
    }
    setError('');
    onSave({ title, tag, description, review });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>Edit Post</h3>
      {error && <div style={{ color: '#D90429', fontSize: '0.85rem' }}>{error}</div>}

      <div>
        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Post Name</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Tags</label>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="#Italian #Pasta"
        />
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Description</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>Review</label>
        <textarea
          rows={3}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <button type="button" onClick={onCancel} className="btn btn-outline">Cancel</button>
        <button type="submit" className="btn">Save Changes</button>
      </div>
    </form>
  );
}
