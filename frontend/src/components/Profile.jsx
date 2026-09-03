import { useState } from 'react';
import EditProfile from './EditProfile';

export default function Profile({ profile, onUpdateProfile }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(profile?.followers || 1240);
  const [isEditing, setIsEditing] = useState(false);

  if (!profile) return null;

  const toggleFollow = () => {
    if (isFollowing) {
      setFollowerCount(followerCount - 1);
      setIsFollowing(false);
    } else {
      setFollowerCount(followerCount + 1);
      setIsFollowing(true);
    }
  };

  const handleSave = (updatedProfile) => {
    if (onUpdateProfile) onUpdateProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <section style={{ backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      {isEditing ? (
        <EditProfile profile={profile} onSave={handleSave} onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <img
              src={profile.avatar || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"}
              alt={profile.username}
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--border-color)' }}
            />
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h1 style={{ margin: '0 0 0.2rem 0', fontSize: '2.2rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {profile.username}
                  </h1>
                  <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic', fontSize: '1rem', display: 'block' }}>
                    {profile.subtitle || "home cook, obsessed with pasta"}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-outline"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={toggleFollow}
                    className="btn"
                    style={{ backgroundColor: isFollowing ? '#555' : 'var(--primary-color)' }}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', margin: '1rem 0' }}>
                <span><strong>{followerCount}</strong> followers</span>
                <span><strong>{profile.following || 382}</strong> following</span>
                <span><strong>{profile.posts?.length || 2}</strong> posts</span>
              </div>

              <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--text-primary)' }}>
                {profile.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
