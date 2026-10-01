export default function CommentsComponent() {
  const comments = [
    { id: 1, title: 'Absolutely delicious!', body: 'Tried this recipe, it was amazing.', author: 'chef_mario', date: 'Sep 2, 2026' },
    { id: 2, title: 'Great pasta!', body: 'My family loved it.', author: 'pasta_lover', date: 'Sep 1, 2026' }
  ];

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Comments</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {comments.map(c => (
          <div key={c.id} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '8px', backgroundColor: 'var(--card-bg)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>{c.title}</h4>
            <p style={{ margin: '0 0 0.5rem 0' }}>{c.body}</p>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{c.author} - {c.date}</span>
          </div>
        ))}
      </div>
      <form style={{ marginTop: '1rem' }}>
        <input type="text" placeholder="Review title" required />
        <textarea placeholder="Review body" rows="3" required></textarea>
        <button type="submit" className="btn">Post Comment</button>
      </form>
    </div>
  );
}
