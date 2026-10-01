import { useState } from 'react';

export default function EditProfile({ profile, onSave, onCancel, saving }) {
  const [username, setUsername] = useState(profile?.username || '');
  const [subtitle, setSubtitle] = useState(profile?.subtitle || '');
  const [bio, setBio] = useState(profile?.bio || '');
  const [avatar, setAvatar] = useState(profile?.avatar || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }
    setError('');
    onSave({ username, subtitle, bio, avatar, name: username });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h3 className="m-0 mb-1 text-forkful-primary font-display text-xl">Edit Profile Information</h3>
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div>
        <label className="block font-semibold text-sm mb-1">Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>

      <div>
        <label className="block font-semibold text-sm mb-1">Headline / Subtitle</label>
        <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="e.g. home cook, obsessed with pasta" />
      </div>

      <div>
        <label className="block font-semibold text-sm mb-1">Avatar Image URL</label>
        <input type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
      </div>

      <div>
        <label className="block font-semibold text-sm mb-1">Bio Description</label>
        <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>

      <div className="flex gap-2 justify-end mt-2">
        <button type="button" onClick={onCancel} className="btn btn-outline">Cancel</button>
        <button type="submit" className="btn" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
      </div>
    </form>
  );
}
