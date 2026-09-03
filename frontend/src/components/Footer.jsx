export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--border-color)', marginTop: '4rem', padding: '3rem 2rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🍴</span>
            <span>Forkful</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '280px', marginTop: '0.5rem' }}>
            Share your plate to the world — from weeknight pasta to weekend feasts.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', color: 'var(--text-secondary)' }}>
            <span>🌐</span>
            <span>📷</span>
            <span>✉</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Trending Recipes</li>
              <li>Top Chefs</li>
              <li>Seasonal Dishes</li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Community</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Guidelines</li>
              <li>Foodie Events</li>
              <li>Discussions</li>
            </ul>
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>About</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>IMY 220 Project</li>
              <li>Deliverable 1</li>
              <li>2026</li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '2rem auto 0 auto', borderTop: '1px solid #f0f0f0', paddingTop: '1rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        © 2026 Forkful. Built for IMY 220 Deliverable 1.
      </div>
    </footer>
  );
}
