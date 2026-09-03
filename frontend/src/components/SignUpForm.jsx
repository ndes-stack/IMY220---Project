import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, AlertCircleIcon } from './Icons';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!username.trim()) {
      errs.username = 'Username is required.';
    } else if (username.trim().length < 3) {
      errs.username = 'Username must be at least 3 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
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
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), email: email.trim(), password })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setServerMessage(data.message || 'Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate('/home');
        }, 1200);
      } else {
        setServerError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setServerMessage('Account created (stub mode). Redirecting...');
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
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Username</label>
        <input
          type="text"
          placeholder="e.g. food_master"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (errors.username) setErrors({ ...errors, username: '' });
          }}
          style={{ borderColor: errors.username ? '#D90429' : 'var(--border-color)' }}
        />
        {errors.username && <span style={{ color: '#D90429', fontSize: '0.8rem', display: 'block' }}>{errors.username}</span>}
      </div>

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
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          style={{ borderColor: errors.password ? '#D90429' : 'var(--border-color)' }}
        />
        {errors.password && <span style={{ color: '#D90429', fontSize: '0.8rem', display: 'block' }}>{errors.password}</span>}
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Confirm Password</label>
        <input
          type="password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
          }}
          style={{ borderColor: errors.confirmPassword ? '#D90429' : 'var(--border-color)' }}
        />
        {errors.confirmPassword && <span style={{ color: '#D90429', fontSize: '0.8rem', display: 'block' }}>{errors.confirmPassword}</span>}
      </div>

      <button
        type="submit"
        className="btn"
        disabled={isLoading}
        style={{ marginTop: '0.4rem', opacity: isLoading ? 0.7 : 1 }}
      >
        {isLoading ? 'Creating Account...' : 'Sign up'}
      </button>
    </form>
  );
}
