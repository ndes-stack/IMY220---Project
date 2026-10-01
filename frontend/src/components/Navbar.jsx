import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ForkKnifeIcon } from './Icons';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-forkful-border sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-8 py-3">
        <Link to={isAuthenticated ? '/home' : '/'} className="flex items-center gap-2 text-forkful-primary font-display text-2xl font-extrabold tracking-tight">
          <ForkKnifeIcon size={24} color="currentColor" />
          <span>FORKFUL</span>
        </Link>

        <button
          className="sm:hidden text-forkful-ink"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className={`${menuOpen ? 'flex' : 'hidden'} sm:flex absolute sm:static top-full left-0 right-0 bg-white sm:bg-transparent border-b sm:border-0 border-forkful-border flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center px-4 sm:px-0 py-4 sm:py-0`}>
          {isAuthenticated ? (
            <>
              <Link to="/home" className="font-medium text-forkful-ink hover:text-forkful-primary">Discover</Link>
              <Link to={`/profile/${user?.id}`} className="font-medium text-forkful-ink hover:text-forkful-primary">My Profile</Link>
              <button onClick={() => navigate('/home')} className="btn text-sm px-4 py-1.5">+ Post</button>
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatar}
                  alt={user?.username}
                  className="w-8 h-8 rounded-full object-cover border border-forkful-border"
                />
                <span className="text-sm font-semibold">{user?.username}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline text-sm px-3 py-1.5">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-forkful-muted hover:text-forkful-primary">Sign in</Link>
              <Link to="/signup" className="btn btn-outline text-sm px-3 py-1.5">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
