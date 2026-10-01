import { useState } from 'react';

export default function EditPost({ post, onSave, onCancel, saving }) {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h3 className="m-0 mb-1 text-forkful-primary font-display text-xl">Edit Post</h3>
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div>
        <label className="block font-semibold text-sm mb-1">Post Name</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div>
        <label className="block font-semibold text-sm mb-1">Tags</label>
        <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="#Italian #Pasta" />
      </div>

      <div>
        <label className="block font-semibold text-sm mb-1">Description</label>
        <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div>
        <label className="block font-semibold text-sm mb-1">Review</label>
        <textarea rows={3} value={review} onChange={(e) => setReview(e.target.value)} />
      </div>

      <div className="flex gap-2 justify-end mt-2">
        <button type="button" onClick={onCancel} className="btn btn-outline">Cancel</button>
        <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
      </div>
    </form>
  );
}
