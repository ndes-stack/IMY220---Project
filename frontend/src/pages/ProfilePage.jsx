import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../components/Profile';
import Friend from '../components/Friend';
import PostPreview from '../components/PostPreview';
import { dummyProfiles, dummyPosts } from '../data/dummyData';

export default function ProfilePage() {
  const { id } = useParams();
  const profileId = id || 1;
  const initialProfile = dummyProfiles[profileId] || {
    id: profileId,
    username: `chef_${profileId}`,
    name: `User ${profileId}`,
    subtitle: "passionate home cook & recipe tester",
    bio: "Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first class nulla ut.",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80",
    followers: 412,
    following: 198,
    friends: [
      { id: 201, username: "chef_mario", name: "Mario B", subtitle: "Pasta Specialist", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" },
      { id: 202, username: "baker_jane", name: "Jane Doe", subtitle: "Artisan Baker", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" }
    ]
  };

  const [profile, setProfile] = useState(initialProfile);

  // User posts passed to post preview
  const userPosts = dummyPosts.filter(p => p.author === profile.username || p.id <= 4);

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Profile component with dummy data */}
      <Profile profile={profile} onUpdateProfile={(updated) => setProfile({ ...profile, ...updated })} />

      {/* Component to list user's recent posts */}
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.6rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          Recent Posts
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.2rem' }}>
          {userPosts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Friends component displaying users friends */}
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.6rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          Friends & Cooking Pals ({profile.friends?.length || 0})
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {profile.friends?.map((f) => (
            <Friend key={f.id} friend={f} />
          ))}
        </div>
      </section>
    </main>
  );
}
