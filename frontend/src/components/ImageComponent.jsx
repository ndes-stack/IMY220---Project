import { useState } from 'react';
import { HeartIcon } from './Icons';

export default function ImageComponent({ src, alt, initialLikes = 0, liked: initialLiked = false, onToggleLike }) {
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [busy, setBusy] = useState(false);

  const toggleLike = async () => {
    if (busy) return;
    if (!onToggleLike) {
      setLiked((l) => !l);
      setLikes((n) => (liked ? n - 1 : n + 1));
      return;
    }
    setBusy(true);
    try {
      const result = await onToggleLike();
      if (result) {
        setLiked(result.liked);
        setLikes(result.likes);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <figure className="m-0 relative rounded-xl overflow-hidden shadow-md">
      <img
        src={src || "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"}
        alt={alt || "Post dish image"}
        className="w-full h-[480px] object-cover block"
      />
      <button
        onClick={toggleLike}
        disabled={busy}
        className={`absolute bottom-4 right-4 rounded-full px-4 py-2 flex items-center gap-1.5 cursor-pointer font-semibold shadow-lg ${liked ? 'bg-forkful-primary text-white' : 'bg-white/90 text-forkful-primary'}`}
      >
        <HeartIcon size={16} filled={liked} color="currentColor" />
        <span>{likes}</span>
      </button>
    </figure>
  );
}
