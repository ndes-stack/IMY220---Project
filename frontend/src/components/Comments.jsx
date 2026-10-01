import { useState } from 'react';
import api from '../api';

export default function Comments({ postId, comments = [] }) {
  const [commentList, setCommentList] = useState(comments);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) {
      setError('Please write a comment before posting.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const data = await api.addComment(postId, { title: title.trim() || 'Comment', body: body.trim() });
      setCommentList((prev) => [data.comment, ...prev]);
      setTitle('');
      setBody('');
    } catch (err) {
      setError(err.message || 'Could not post comment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-10">
      <h3 className="text-2xl font-display border-b-2 border-forkful-border pb-2 mb-6">
        Comments ({commentList.length})
      </h3>

      <div className="grid gap-5 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {commentList.map((c) => (
          <article key={c.id} className="p-5 bg-forkful-card rounded-lg border border-forkful-border shadow-sm flex flex-col justify-between">
            <div>
              {c.title && <h4 className="m-0 mb-1.5 text-forkful-primary text-base font-display">{c.title}</h4>}
              <p className="m-0 mb-3 text-sm leading-relaxed">{c.body}</p>
            </div>
            <div className="flex items-center gap-2 border-t border-forkful-border/60 pt-2.5">
              {c.authorAvatar && (
                <img src={c.authorAvatar} alt={c.author} className="w-7 h-7 rounded-full object-cover" />
              )}
              <div>
                <strong className="text-sm block">{c.author}</strong>
                <small className="text-forkful-muted text-xs">{c.date}</small>
              </div>
            </div>
          </article>
        ))}
        {commentList.length === 0 && <p className="text-forkful-muted">Be the first to comment on this dish.</p>}
      </div>

      <div className="bg-forkful-card p-6 rounded-lg border border-forkful-border">
        <h4 className="m-0 mb-4 font-display text-lg">Leave a Review / Comment</h4>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <input
            type="text"
            placeholder="Comment Title (e.g. Delicious pasta!)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows={3}
            placeholder="Write your review or comment..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button type="submit" className="btn self-start" disabled={submitting}>
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>
    </section>
  );
}
