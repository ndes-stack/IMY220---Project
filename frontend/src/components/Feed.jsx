import PostPreview from './PostPreview';

export default function Feed({ posts = [] }) {
  if (posts.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>No posts available.</p>;
  }

  return (
    <section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
