import { Link } from 'react-router-dom';
import { HeartIcon } from './Icons';

export default function PostPreview({ post }) {
  if (!post) return null;

  return (
    <article
      style={{
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: 'var(--card-bg)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease'
      }}
    >
      <Link to={`/post/${post.id}`} style={{ display: 'block', height: '210px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={post.image || "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {post.tag && (
          <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
            {post.tag}
          </span>
        )}
      </Link>

      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.15rem' }}>
            <Link to={`/post/${post.id}`} style={{ color: 'var(--text-primary)' }}>{post.title}</Link>
          </h3>
          <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            {post.description ? `${post.description.substring(0, 85)}...` : ''}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '0.6rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>By {post.author || "chef"}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <HeartIcon size={14} filled={true} color="var(--primary-color)" />
            <span>{post.likes || 0}</span>
          </span>
        </div>
      </div>
    </article>
  );
}
