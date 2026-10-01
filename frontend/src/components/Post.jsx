import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditPost from './EditPost';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function Post({ post, onUpdatePost }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportMessage, setReportMessage] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!post) {
    return <p>Post not found.</p>;
  }

  const isOwner = user && post.authorId === user.id;

  const handleSave = async (updatedData) => {
    setSaving(true);
    try {
      const data = await api.updatePost(post.id, updatedData);
      if (onUpdatePost) onUpdatePost(data.post);
      setIsEditing(false);
    } catch (err) {
      alert(err.message || 'Could not update post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this post permanently?')) return;
    setDeleting(true);
    try {
      await api.deletePost(post.id);
      navigate('/home');
    } catch (err) {
      alert(err.message || 'Could not delete post.');
      setDeleting(false);
    }
  };

  const handleReport = async (e) => {
    e.preventDefault();
    if (!reportReason.trim()) return;
    try {
      const data = await api.reportPost(post.id, reportReason.trim());
      setReportMessage(data.message || 'Report submitted.');
      setReportReason('');
      setTimeout(() => { setReportOpen(false); setReportMessage(''); }, 1500);
    } catch (err) {
      setReportMessage(err.message || 'Could not submit report.');
    }
  };

  return (
    <article className="bg-forkful-card p-6 rounded-xl border border-forkful-border">
      {isEditing ? (
        <EditPost post={post} onSave={handleSave} onCancel={() => setIsEditing(false)} saving={saving} />
      ) : (
        <div>
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div>
              <h1 className="m-0 mb-2 text-3xl font-display text-forkful-ink">{post.title}</h1>
              <span className="inline-block bg-forkful-primary-light text-forkful-primary px-2.5 py-1 rounded-full text-sm font-semibold">
                {post.tag || "#Food"}
              </span>
            </div>
            <div className="flex gap-2">
              {isOwner && (
                <>
                  <button onClick={() => setIsEditing(true)} className="btn btn-outline text-sm px-3.5 py-1.5">Edit Post</button>
                  <button onClick={handleDelete} disabled={deleting} className="btn text-sm px-3.5 py-1.5 bg-red-600 hover:bg-red-700">
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </>
              )}
              {!isOwner && (
                <button onClick={() => setReportOpen((o) => !o)} className="btn btn-outline text-sm px-3.5 py-1.5">Report</button>
              )}
            </div>
          </div>

          {reportOpen && (
            <form onSubmit={handleReport} className="mt-3 p-3 bg-forkful-bg rounded-lg border border-forkful-border flex gap-2 items-start">
              <input
                type="text"
                placeholder="Reason for reporting this post..."
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="flex-1"
              />
              <button type="submit" className="btn text-sm px-3 py-2">Submit</button>
            </form>
          )}
          {reportMessage && <p className="text-sm text-forkful-accent mt-2">{reportMessage}</p>}

          <div className="flex items-center gap-2.5 my-4">
            {post.authorAvatar && (
              <img src={post.authorAvatar} alt={post.author} className="w-9 h-9 rounded-full object-cover" />
            )}
            <div>
              <span className="font-semibold block">{post.author || "chef"}</span>
              <small className="text-forkful-muted">{post.date || "Today"}</small>
            </div>
          </div>

          <div className="my-4">
            <h4 className="m-0 mb-1 text-forkful-muted uppercase text-xs tracking-wide">Description</h4>
            <p className="m-0 leading-relaxed">{post.description}</p>
          </div>

          <div className="mt-6 p-4 bg-forkful-bg border-l-4 border-forkful-primary rounded">
            <h4 className="m-0 mb-2 text-forkful-primary font-display text-base">Chef's Review & Notes</h4>
            <p className="m-0 italic leading-relaxed">
              "{post.review || 'An extraordinary recipe packed with deep flavors.'}"
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
