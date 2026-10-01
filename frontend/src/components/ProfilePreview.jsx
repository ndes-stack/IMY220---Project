import { Link } from 'react-router-dom';

export default function ProfilePreview({ profile }) {
  if (!profile) return null;

  return (
    <div className="flex items-center gap-3 p-3 border border-forkful-border rounded-lg bg-forkful-card shadow-sm">
      <img
        src={profile.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
        alt={profile.username}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <Link to={`/profile/${profile.id}`} className="font-semibold block text-forkful-ink">
          {profile.name || profile.username}
        </Link>
        <span className="text-forkful-muted text-sm block">
          {profile.subtitle || `@${profile.username}`}
        </span>
      </div>
    </div>
  );
}
