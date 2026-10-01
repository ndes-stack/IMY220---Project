import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/home" replace />;

  return (
    <main className="min-h-[80vh] flex justify-center items-center px-6 py-10">
      <div className="w-full max-w-md bg-forkful-card p-9 rounded-xl border border-forkful-border shadow-sm">
        <h2 className="font-display m-0 mb-2 text-forkful-primary text-2xl">Welcome Back</h2>
        <p className="text-forkful-muted text-sm mb-6">
          Sign in to your Forkful account to share recipes and connect.
        </p>
        <LoginForm />
        <p className="mt-6 text-sm text-center text-forkful-muted">
          Don't have an account? <Link to="/signup" className="text-forkful-primary font-semibold">Sign up here</Link>
        </p>
      </div>
    </main>
  );
}
