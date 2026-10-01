import { Link } from 'react-router-dom';
import { HeartIcon } from './Icons';

export default function PostPreview({ post }) {
  if (!post) return null;

  return (
    <article className="border border-forkful-border rounded-xl overflow-hidden bg-forkful-card shadow-sm flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/post/${post.id}`} className="block h-52 overflow-hidden relative">
        <img
          src={post.image || "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        {post.tag && (
          <span className="absolute top-2.5 left-2.5 bg-black/60 text-white px-2 py-1 rounded text-xs">
            {post.tag}
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="m-0 mb-1.5 text-lg font-display">
            <Link to={`/post/${post.id}`} className="text-forkful-ink">{post.title}</Link>
          </h3>
          <p className="m-0 mb-3 text-sm text-forkful-muted leading-snug">
            {post.description ? `${post.description.substring(0, 85)}...` : ''}
          </p>
        </div>

        <div className="flex justify-between items-center border-t border-forkful-border/60 pt-2.5">
          <span className="text-sm text-forkful-muted">By {post.author || "chef"}</span>
          <span className="text-sm text-forkful-primary font-semibold flex items-center gap-1">
            <HeartIcon size={14} filled={true} color="currentColor" />
            <span>{post.likes || 0}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
