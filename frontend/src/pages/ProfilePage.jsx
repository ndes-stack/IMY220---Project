// frontend/src/pages/ProfilePage.jsx
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../components/Profile';
import Friend from '../components/Friend';
import PostPreview from '../components/PostPreview';
import AlbumPreview from '../components/AlbumPreview';
import CreateAlbum from '../components/CreateAlbum';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function ProfilePage() {
  const { id } = useParams();
  const { user, updateLocalUser } = useAuth();
  const profileId = id || user?.id;

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendStatus, setFriendStatus] = useState('none');
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [pendingFriendshipId, setPendingFriendshipId] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!profileId) return;
    setLoading(true);
    setError('');
    try {
      const data = await api.getUser(profileId);
      setProfile(data.profile);
      setPosts(data.posts);
      setFriends(data.friends);
      setFriendStatus(data.friendStatus);
      setIsOwnProfile(data.isOwnProfile);

      const albumData = await api.getAlbums(profileId);
      setAlbums(albumData.albums);

      if (data.friendStatus === 'pending-received') {
        const reqs = await api.getFriendRequests();
        const match = reqs.requests.find((r) => r.from && r.from.id === profileId);
        setPendingFriendshipId(match ? match.friendshipId : null);
      }

      if (data.isOwnProfile) {
        const reqs = await api.getFriendRequests();
        setPendingRequests(reqs.requests);
      }
    } catch (err) {
      setError(err.message || 'Could not load profile.');
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => { load(); }, [load]);

  const handleUpdateProfile = async (updated) => {
    const data = await api.updateUser(profileId, updated);
    setProfile(data.user);
    if (isOwnProfile) updateLocalUser(data.user);
  };

  const handleFriendAction = async (action) => {
    try {
      if (action === 'request') {
        await api.sendFriendRequest(profileId);
        setFriendStatus('pending-sent');
      } else if (action === 'accept') {
        if (!pendingFriendshipId) return;
        await api.acceptFriendRequest(pendingFriendshipId);
        setFriendStatus('friends');
      } else if (action === 'unfriend') {
        await api.unfriend(profileId);
        setFriendStatus('none');
      }
    } catch (err) {
      alert(err.message || 'Could not update friendship.');
    }
  };

  const handleAcceptRequest = async (friendshipId) => {
    try {
      await api.acceptFriendRequest(friendshipId);
      setPendingRequests((prev) => prev.filter((r) => r.friendshipId !== friendshipId));
      load();
    } catch (err) {
      alert(err.message || 'Could not accept friend request.');
    }
  };

  const handleDeclineRequest = async (friendshipId) => {
    try {
      await api.declineFriendRequest(friendshipId);
      setPendingRequests((prev) => prev.filter((r) => r.friendshipId !== friendshipId));
    } catch (err) {
      alert(err.message || 'Could not decline friend request.');
    }
  };

  if (loading) {
    return <main className="max-w-6xl mx-auto px-6 py-10 text-center text-forkful-muted">Loading profile...</main>;
  }

  if (error || !profile) {
    return <main className="max-w-6xl mx-auto px-6 py-10 text-center text-red-600">{error || 'Profile not found.'}</main>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <Profile
        profile={profile}
        isOwnProfile={isOwnProfile}
        friendStatus={friendStatus}
        postCount={posts.length}
        onUpdateProfile={handleUpdateProfile}
        onFriendAction={handleFriendAction}
      />

      {isOwnProfile && (
        <section className="mt-10">
          <h2 className="text-2xl font-display border-b-2 border-forkful-border pb-2 mb-5">Albums</h2>
          <CreateAlbum onAlbumCreated={(a) => setAlbums((prev) => [a, ...prev])} />
        </section>
      )}

      {albums.length > 0 && (
        <section className={isOwnProfile ? '' : 'mt-10'}>
          {!isOwnProfile && <h2 className="text-2xl font-display border-b-2 border-forkful-border pb-2 mb-5">Albums</h2>}
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}>
            {albums.map((album) => (
              <AlbumPreview key={album.id} album={album} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-2xl font-display border-b-2 border-forkful-border pb-2 mb-5">
          Recent Posts
        </h2>
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {posts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
          {posts.length === 0 && <p className="text-forkful-muted">No posts yet.</p>}
        </div>
      </section>

      {isOwnProfile && pendingRequests.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-display border-b-2 border-forkful-border pb-2 mb-5">
            Pending Friend Requests ({pendingRequests.length})
          </h2>
          <div className="flex flex-col gap-3">
            {pendingRequests.map((req) => (
              <div key={req.friendshipId} className="flex items-center justify-between gap-3 p-3 border border-forkful-border rounded-lg bg-forkful-card shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={req.from?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                    alt={req.from?.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold">{req.from?.name || req.from?.username}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAcceptRequest(req.friendshipId)} className="btn text-sm px-3 py-1.5">Accept</button>
                  <button onClick={() => handleDeclineRequest(req.friendshipId)} className="btn btn-outline text-sm px-3 py-1.5">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-2xl font-display border-b-2 border-forkful-border pb-2 mb-5">
          Friends & Cooking Pals ({friends.length})
        </h2>
        <div className="flex gap-4 flex-wrap">
          {friends.map((f) => (
            <Friend key={f.id} friend={f} />
          ))}
          {friends.length === 0 && <p className="text-forkful-muted">No friends yet.</p>}
        </div>
      </section>
    </main>
  );
}