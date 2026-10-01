import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import { ForkKnifeIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';

export default function SplashPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/home" replace />;

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=80",
      title: "Handmade Truffle Tagliatelle"
    },
    {
      url: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1000&q=80",
      title: "Woodfired Neapolitan Pizza"
    },
    {
      url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
      title: "Rich Tonkotsu Ramen"
    }
  ];

  const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div className="min-h-screen flex flex-col bg-forkful-bg">
      <header className="px-6 sm:px-10 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2 text-forkful-primary font-display text-3xl font-extrabold">
          <ForkKnifeIcon size={26} color="currentColor" />
          <span>FORKFUL</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('login')} className={activeTab === 'login' ? 'btn px-4 py-1.5' : 'btn btn-outline px-4 py-1.5'}>Log in</button>
          <button onClick={() => setActiveTab('signup')} className={activeTab === 'signup' ? 'btn px-4 py-1.5' : 'btn btn-outline px-4 py-1.5'}>Sign up</button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 flex items-center gap-12 flex-wrap">
        <section className="flex-1 min-w-[320px]">
          <span className="text-forkful-primary font-bold uppercase tracking-widest text-sm">Welcome to the Foodie Network</span>
          <h1 className="font-display text-5xl font-extrabold leading-tight my-3 text-forkful-ink">
            Every dish <br />
            <span className="text-forkful-primary">has a story.</span>
          </h1>
          <p className="text-lg text-forkful-muted leading-relaxed mb-6 max-w-md">
            Share your plate to the world - from weeknight pasta to weekend feasts. Discover real reviews, recipes, and home chefs.
          </p>

          <div className="flex gap-4 mb-8">
            <Link to="/signup" className="btn px-6 py-2.5 text-base inline-flex items-center gap-2">
              <span>Get started</span>
              <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div className="bg-forkful-card p-7 rounded-xl border border-forkful-border shadow-sm">
            <div className="flex border-b-2 border-forkful-border mb-5">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 bg-transparent border-0 font-bold cursor-pointer text-base ${activeTab === 'login' ? 'border-b-[3px] border-forkful-primary text-forkful-primary' : 'text-forkful-muted'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 bg-transparent border-0 font-bold cursor-pointer text-base ${activeTab === 'signup' ? 'border-b-[3px] border-forkful-primary text-forkful-primary' : 'text-forkful-muted'}`}
              >
                Create Account
              </button>
            </div>

            {activeTab === 'login' ? <LoginForm /> : <SignUpForm />}
          </div>
        </section>

        <section className="flex-1 min-w-[320px] relative">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src={carouselImages[carouselIndex].url}
              alt={carouselImages[carouselIndex].title}
              className="w-full h-[480px] object-cover block"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h3 className="m-0 text-xl font-display">{carouselImages[carouselIndex].title}</h3>
              <p className="mt-1 text-sm opacity-90">Featured Community Creation</p>
            </div>

            <button onClick={prevSlide} className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/90 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-gray-700">
              <ChevronLeftIcon size={20} />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/90 border-0 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer text-gray-700">
              <ChevronRightIcon size={20} />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-3">
            {carouselImages.map((_, i) => (
              <span
                key={i}
                onClick={() => setCarouselIndex(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer ${carouselIndex === i ? 'bg-forkful-primary' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
