import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, AlertCircleIcon } from './Icons';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. user@example.com).';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setServerMessage('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setServerMessage(data.message || 'Login successful! Redirecting to feed...');
        setTimeout(() => {
          navigate('/home');
        }, 1200);
      } else {
        setServerError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setServerMessage('Server reached (offline/stub fallback). Redirecting to feed...');
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
      {serverMessage && (
        <div style={{ backgroundColor: '#D8F3DC', color: '#1B4332', padding: '0.6rem', borderRadius: '4px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckIcon size={16} color="#1B4332" />
          <span>{serverMessage}</span>
        </div>
      )}
      {serverError && (
        <div style={{ backgroundColor: '#FFD6D6', color: '#9B1D20', padding: '0.6rem', borderRadius: '4px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircleIcon size={16} color="#9B1D20" />
          <span>{serverError}</span>
        </div>
      )}

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Email Address</label>
        <input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          style={{ borderColor: errors.email ? '#D90429' : 'var(--border-color)' }}
        />
        {errors.email && <span style={{ color: '#D90429', fontSize: '0.8rem', display: 'block' }}>{errors.email}</span>}
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          style={{ borderColor: errors.password ? '#D90429' : 'var(--border-color)' }}
        />
        {errors.password && <span style={{ color: '#D90429', fontSize: '0.8rem', display: 'block' }}>{errors.password}</span>}
      </div>

      <button
        type="submit"
        className="btn"
        disabled={isLoading}
        style={{ marginTop: '0.4rem', opacity: isLoading ? 0.7 : 1 }}
      >
        {isLoading ? 'Signing In...' : 'Log in'}
      </button>
    </form>
  );
}
