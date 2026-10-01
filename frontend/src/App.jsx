import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import AlbumPage from './pages/AlbumPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

// Layout wrapper for all pages except Splash
function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-forkful-bg">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}

// Routes that require a logged-in user redirect to the splash page otherwise.
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Splash Page (no Navbar per spec) */}
        <Route path="/" element={<SplashPage />} />

        {/* Static and Dynamic Routes wrapped in MainLayout */}
        <Route path="/home" element={<RequireAuth><MainLayout><HomePage /></MainLayout></RequireAuth>} />
        <Route path="/discover" element={<RequireAuth><MainLayout><HomePage /></MainLayout></RequireAuth>} />

        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/signup" element={<MainLayout><SignUpPage /></MainLayout>} />
        <Route path="/register" element={<MainLayout><SignUpPage /></MainLayout>} />

        <Route path="/profile" element={<RequireAuth><MainLayout><ProfilePage /></MainLayout></RequireAuth>} />
        <Route path="/profile/:id" element={<RequireAuth><MainLayout><ProfilePage /></MainLayout></RequireAuth>} />

        <Route path="/post/:id" element={<RequireAuth><MainLayout><PostPage /></MainLayout></RequireAuth>} />

        <Route path="/album/:id" element={<RequireAuth><MainLayout><AlbumPage /></MainLayout></RequireAuth>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
