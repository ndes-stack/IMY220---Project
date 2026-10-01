import { useState } from 'react';
import api from '../api';

export default function CreateAlbum({ onAlbumCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Album name must be at least 2 characters.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const data = await api.createAlbum({ name: name.trim(), description: description.trim(), tag: tag.trim() });
      if (onAlbumCreated) onAlbumCreated(data.album);
      setName(''); setDescription(''); setTag(''); setIsOpen(false);
    } catch (err) {
      setError(err.message || 'Could not create album.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="btn btn-outline w-full py-3 text-base">
          + Create New Album
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-5 bg-forkful-card rounded-xl border border-forkful-border flex flex-col gap-2.5">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <input type="text" placeholder="Album name (e.g. Weeknight Dinners)" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="Tag (e.g. #Quick)" value={tag} onChange={(e) => setTag(e.target.value)} />
          <textarea rows={2} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setIsOpen(false)} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn" disabled={submitting}>{submitting ? 'Creating...' : 'Create Album'}</button>
          </div>
        </form>
      )}
    </div>
  );
}
