import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

export default function SplashPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [carouselIndex, setCarouselIndex] = useState(0);

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

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-color)' }}>
      {/* Splash Top Bar */}
      <header style={{ padding: '1.2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🍴</span>
          <span>FORKFUL</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setActiveTab('login')}
            className={activeTab === 'login' ? 'btn' : 'btn btn-outline'}
            style={{ padding: '6px 16px' }}
          >
            Log in
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={activeTab === 'signup' ? 'btn' : 'btn btn-outline'}
            style={{ padding: '6px 16px' }}
          >
            Sign up
          </button>
        </div>
      </header>

      {/* Main Hero & Forms */}
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', padding: '2rem', display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
        <section style={{ flex: '1 1 450px' }}>
          <span style={{ color: 'var(--primary-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
            Welcome to the Foodie Network
          </span>
          <h1 style={{ fontSize: '3.4rem', fontWeight: 800, lineHeight: 1.15, margin: '0.6rem 0 1rem 0', color: 'var(--text-primary)' }}>
            Every dish <br />
            <span style={{ color: 'var(--primary-color)' }}>has a story.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '440px' }}>
            Share your plate to the world — from weeknight pasta to weekend feasts. Discover real reviews, recipes, and home chefs.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <Link to="/home" className="btn" style={{ padding: '10px 24px', fontSize: '1rem' }}>
              Get started →
            </Link>
          </div>

          {/* Tabbed Auth Form Box on Splash Page */}
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '1.8rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', borderBottom: '2px solid #f0f0f0', marginBottom: '1.2rem' }}>
              <button
                onClick={() => setActiveTab('login')}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'login' ? '3px solid var(--primary-color)' : 'none',
                  color: activeTab === 'login' ? 'var(--primary-color)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'signup' ? '3px solid var(--primary-color)' : 'none',
                  color: activeTab === 'signup' ? 'var(--primary-color)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Create Account
              </button>
            </div>

            {activeTab === 'login' ? <LoginForm /> : <SignUpForm />}
          </div>
        </section>

        {/* Hero Carousel */}
        <section style={{ flex: '1 1 450px', position: 'relative' }}>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}>
            <img
              src={carouselImages[carouselIndex].url}
              alt={carouselImages[carouselIndex].title}
              style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', padding: '1.5rem', color: 'white' }}>
              <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{carouselImages[carouselIndex].title}</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', opacity: 0.9 }}>Featured Community Creation</p>
            </div>

            <button
              onClick={prevSlide}
              style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ›
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
            {carouselImages.map((_, i) => (
              <span
                key={i}
                onClick={() => setCarouselIndex(i)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: carouselIndex === i ? 'var(--primary-color)' : '#ccc',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
