import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageComponent from '../components/ImageComponent';
import Post from '../components/Post';
import Comments from '../components/Comments';
import { dummyPosts } from '../data/dummyData';

export default function PostPage() {
  const { id } = useParams();
  const postId = parseInt(id, 10) || 1;

  // Find post from dummy data or fallback gracefully
  const matchedPost = dummyPosts.find((p) => p.id === postId) || {
    id: postId,
    title: `Delicious Creation #${postId}`,
    tag: "#ChefSpecial #Seasonal",
    description: "An authentic home-cooked culinary masterpiece made from locally sourced ingredients.",
    review: "The texture and balance of flavors in this dish exceeded every expectation. An absolute must-try.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    author: "pasta_maestro",
    authorAvatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80",
    likes: 67,
    date: "Sep 2, 2026",
    comments: [
      {
        id: 991,
        title: "Looks incredible!",
        body: "Love the plating and vibrant colors.",
        author: "foodie_sarah",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        date: "Today"
      }
    ]
  };

  const [post, setPost] = useState(matchedPost);

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
        {/* Left side: Image Component */}
        <ImageComponent src={post.image} alt={post.title} initialLikes={post.likes} />

        {/* Right side: Post Component with Edit Post form */}
        <Post post={post} onUpdatePost={(updated) => setPost({ ...post, ...updated })} />
      </div>

      {/* Comments Component */}
      <Comments comments={post.comments} />
    </main>
  );
}
