import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, AlertCircleIcon } from './Icons';
import { useAuth } from '../context/AuthContext';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
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
      const data = await register(username.trim(), email.trim(), password);
      setServerMessage(data.message || 'Account created successfully! Redirecting...');
      setTimeout(() => navigate('/home'), 800);
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 w-full">
      {serverMessage && (
        <div className="bg-green-50 text-green-800 px-3 py-2 rounded-md text-sm flex items-center gap-2">
          <CheckIcon size={16} color="currentColor" />
          <span>{serverMessage}</span>
        </div>
      )}
      {serverError && (
        <div className="bg-red-50 text-red-700 px-3 py-2 rounded-md text-sm flex items-center gap-2">
          <AlertCircleIcon size={16} color="currentColor" />
          <span>{serverError}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-1">Username</label>
        <input
          type="text"
          placeholder="e.g. food_master"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (errors.username) setErrors({ ...errors, username: '' });
          }}
          className={errors.username ? 'border-red-500' : ''}
        />
        {errors.username && <span className="text-red-600 text-xs block mt-1">{errors.username}</span>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Email Address</label>
        <input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <span className="text-red-600 text-xs block mt-1">{errors.email}</span>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Password</label>
        <input
          type="password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: '' });
          }}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && <span className="text-red-600 text-xs block mt-1">{errors.password}</span>}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Confirm Password</label>
        <input
          type="password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
          }}
          className={errors.confirmPassword ? 'border-red-500' : ''}
        />
        {errors.confirmPassword && <span className="text-red-600 text-xs block mt-1">{errors.confirmPassword}</span>}
      </div>

      <button type="submit" className="btn mt-1" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Sign up'}
      </button>
    </form>
  );
}
