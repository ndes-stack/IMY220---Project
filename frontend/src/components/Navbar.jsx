import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100 }}>
      <nav style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 2rem' }}>
        <div>
          <Link to="/home" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-color)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🍴</span>
            <span>FORKFUL</span>
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'center' }}>
          <Link to="/home" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Discover</Link>
          <Link to="/profile/1" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Profile</Link>
          <button onClick={() => navigate('/home')} className="btn" style={{ padding: '6px 14px', fontSize: '0.9rem' }}>
            + Post
          </button>
          <Link to="/login" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Sign in</Link>
          <Link to="/signup" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '5px 12px' }}>
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
