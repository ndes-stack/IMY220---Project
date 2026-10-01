import { Link, Navigate } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/home" replace />;

  return (
    <main className="min-h-[80vh] flex justify-center items-center px-6 py-10">
      <div className="w-full max-w-md bg-forkful-card p-9 rounded-xl border border-forkful-border shadow-sm">
        <h2 className="font-display m-0 mb-2 text-forkful-primary text-2xl">Join Forkful</h2>
        <p className="text-forkful-muted text-sm mb-6">
          Create an account to start sharing your delicious plates.
        </p>
        <SignUpForm />
        <p className="mt-6 text-sm text-center text-forkful-muted">
          Already have an account? <Link to="/login" className="text-forkful-primary font-semibold">Log in here</Link>
        </p>
      </div>
    </main>
  );
}
