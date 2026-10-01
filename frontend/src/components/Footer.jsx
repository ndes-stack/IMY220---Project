import { ForkKnifeIcon, GlobeIcon, CameraIcon, MailIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-forkful-border mt-16 px-4 sm:px-8 pt-12 pb-8">
      <div className="max-w-6xl mx-auto flex justify-between flex-wrap gap-8">
        <div>
          <div className="flex items-center gap-2 text-forkful-primary font-display text-2xl font-extrabold">
            <ForkKnifeIcon size={22} color="currentColor" />
            <span>Forkful</span>
          </div>
          <p className="text-forkful-muted text-sm max-w-[280px] mt-2">
            Share your plate to the world - from weeknight pasta to weekend feasts.
          </p>
          <div className="flex gap-4 mt-4 text-forkful-muted">
            <span className="cursor-pointer flex items-center" title="Website"><GlobeIcon size={18} /></span>
            <span className="cursor-pointer flex items-center" title="Instagram"><CameraIcon size={18} /></span>
            <span className="cursor-pointer flex items-center" title="Contact"><MailIcon size={18} /></span>
          </div>
        </div>

        <div className="flex gap-12 flex-wrap">
          <div>
            <h4 className="mb-3 text-sm uppercase tracking-wide font-semibold">Explore</h4>
            <ul className="list-none p-0 m-0 text-sm text-forkful-muted flex flex-col gap-2">
              <li>Trending Recipes</li>
              <li>Top Chefs</li>
              <li>Seasonal Dishes</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm uppercase tracking-wide font-semibold">Community</h4>
            <ul className="list-none p-0 m-0 text-sm text-forkful-muted flex flex-col gap-2">
              <li>Guidelines</li>
              <li>Foodie Events</li>
              <li>Discussions</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm uppercase tracking-wide font-semibold">About</h4>
            <ul className="list-none p-0 m-0 text-sm text-forkful-muted flex flex-col gap-2">
              <li>IMY 220 Project</li>
              <li>Deliverable 2</li>
              <li>2026</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 border-t border-forkful-border/60 pt-4 text-center text-forkful-muted text-xs">
        © 2026 Forkful. Built for IMY 220 Deliverable 2.
      </div>
    </footer>
  );
}
