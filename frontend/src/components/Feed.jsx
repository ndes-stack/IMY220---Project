import PostPreview from './PostPreview';

export default function Feed({ posts = [] }) {
  if (posts.length === 0) {
    return <p className="text-center text-forkful-muted mt-8">No posts available.</p>;
  }

  return (
    <section>
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
