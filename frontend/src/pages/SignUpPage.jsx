import { Link } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';

export default function SignUpPage() {
  return (
    <main style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: 'var(--card-bg)', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>Join Forkful</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Create an account to start sharing your delicious plates.
        </p>
        <SignUpForm />
        <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Log in here</Link>
        </p>
      </div>
    </main>
  );
}
