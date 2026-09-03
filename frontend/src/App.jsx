import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Layout wrapper for all pages except Splash
function MainLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Splash Page (no Navbar per spec) */}
        <Route path="/" element={<SplashPage />} />

        {/* Static and Dynamic Routes wrapped in MainLayout */}
        <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/discover" element={<MainLayout><HomePage /></MainLayout>} />

        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/signup" element={<MainLayout><SignUpPage /></MainLayout>} />
        <Route path="/register" element={<MainLayout><SignUpPage /></MainLayout>} />

        <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
        <Route path="/profile/:id" element={<MainLayout><ProfilePage /></MainLayout>} />

        <Route path="/post" element={<MainLayout><PostPage /></MainLayout>} />
        <Route path="/post/:id" element={<MainLayout><PostPage /></MainLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
