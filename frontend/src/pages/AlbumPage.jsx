import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostPreview from '../components/PostPreview';
import api from '../api';
import { useAuth } from '../context/AuthContext';


export default function AlbumPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [album, setAlbum] = useState(null);
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [addPostId, setAddPostId] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getAlbum(id);
      setAlbum(data.album);
      setPosts(data.posts);
      setName(data.album.name);
      setDescription(data.album.description);
      setTag(data.album.tag);
    } catch (err) {
      setError(err.message || 'Album not found.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!album || !user || album.ownerId !== user.id) return;
    api.getPosts('global').then((data) => {
      const inAlbum = new Set((album.postIds || []));
      setMyPosts(data.posts.filter((p) => p.authorId === user.id && !inAlbum.has(p.id)));
    }).catch(() => {});
  }, [album, user]);

  const isOwner = album && user && album.ownerId === user.id;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = await api.updateAlbum(id, { name, description, tag });
      setAlbum(data.album);
      setIsEditing(false);
    } catch (err) {
      alert(err.message || 'Could not update album.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this album? Posts inside it will not be deleted.')) return;
    try {
      await api.deleteAlbum(id);
      navigate(`/profile/${user.id}`);
    } catch (err) {
      alert(err.message || 'Could not delete album.');
    }
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!addPostId) return;
    try {
      await api.addPostToAlbum(id, addPostId);
      await load();
      setAddPostId('');
    } catch (err) {
      alert(err.message || 'Could not add post to album.');
    }
  };

  const handleRemovePost = async (postId) => {
    try {
      await api.removePostFromAlbum(id, postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      alert(err.message || 'Could not remove post from album.');
    }
  };

  if (loading) return <main className="max-w-6xl mx-auto px-6 py-10 text-center text-forkful-muted">Loading album...</main>;
  if (error || !album) return <main className="max-w-6xl mx-auto px-6 py-10 text-center text-red-600">{error || 'Album not found.'}</main>;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <section className="bg-forkful-card p-7 rounded-xl border border-forkful-border shadow-sm mb-8">
        {isEditing ? (
          <form onSubmit={handleSave} className="flex flex-col gap-2.5">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} />
            <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline">Cancel</button>
              <button type="submit" className="btn">Save</button>
            </div>
          </form>
        ) : (
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div>
              <h1 className="m-0 mb-1 text-3xl font-display">{album.name}</h1>
              <span className="inline-block bg-forkful-primary-light text-forkful-primary px-2.5 py-1 rounded-full text-sm font-semibold mb-2">{album.tag}</span>
              <p className="m-0 text-forkful-muted">{album.description}</p>
              <p className="mt-2 text-sm text-forkful-muted">By {album.ownerUsername}</p>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(true)} className="btn btn-outline text-sm px-3.5 py-1.5">Edit</button>
                <button onClick={handleDelete} className="btn text-sm px-3.5 py-1.5 bg-red-600 hover:bg-red-700">Delete</button>
              </div>
            )}
          </div>
        )}
      </section>

      {isOwner && myPosts.length > 0 && (
        <form onSubmit={handleAddPost} className="mb-8 flex gap-2 items-center flex-wrap">
          <select value={addPostId} onChange={(e) => setAddPostId(e.target.value)} className="flex-1 min-w-[220px]">
            <option value="">Add one of your posts to this album...</option>
            {myPosts.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
          <button type="submit" className="btn" disabled={!addPostId}>Add</button>
        </form>
      )}

      <section>
        <h2 className="text-2xl font-display border-b-2 border-forkful-border pb-2 mb-5">
          Dishes in this Album ({posts.length})
        </h2>
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {posts.map((post) => (
            <div key={post.id} className="relative">
              <PostPreview post={post} />
              {isOwner && (
                <button
                  onClick={() => handleRemovePost(post.id)}
                  className="absolute top-2 right-2 bg-white/90 text-red-600 text-xs font-semibold px-2 py-1 rounded shadow"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {posts.length === 0 && <p className="text-forkful-muted">No dishes in this album yet.</p>}
        </div>
      </section>
    </main>
  );
}
