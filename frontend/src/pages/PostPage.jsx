import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import Post from '../components/Post';
import Comments from '../components/Comments';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function PostPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    api.getPost(id)
      .then((data) => { if (active) setPost(data.post); })
      .catch((err) => { if (active) setError(err.message || 'Post not found.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) {
    return <main className="max-w-6xl mx-auto px-6 py-10 text-center text-forkful-muted">Loading dish...</main>;
  }

  if (error || !post) {
    return <main className="max-w-6xl mx-auto px-6 py-10 text-center text-red-600">{error || 'Post not found.'}</main>;
  }

  const liked = user ? (post.likedBy || []).includes(user.id) : false;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <div className="grid gap-10 items-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
        <ImageComponent
          src={post.image}
          alt={post.title}
          initialLikes={post.likes}
          liked={liked}
          onToggleLike={async () => {
            const result = await api.likePost(post.id);
            return result;
          }}
        />

        <Post post={post} onUpdatePost={(updated) => setPost({ ...post, ...updated })} />
      </div>

      <Comments postId={post.id} comments={post.comments} />
    </main>
  );
}
