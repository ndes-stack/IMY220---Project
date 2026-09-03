import { Link } from 'react-router-dom';

export default function ProfilePreview({ profile }) {
  if (!profile) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        padding: '0.8rem',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        backgroundColor: 'var(--card-bg)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}
    >
      <img
        src={profile.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
        alt={profile.username}
        style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
      />
      <div>
        <Link to={`/profile/${profile.id}`} style={{ fontWeight: 600, display: 'block', color: 'var(--text-primary)' }}>
          {profile.name || profile.username}
        </Link>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'block' }}>
          {profile.subtitle || `@${profile.username}`}
        </span>
      </div>
    </div>
  );
}
