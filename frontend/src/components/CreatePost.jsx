import { useState } from 'react';
import api from '../api';

export default function CreatePost({ onPostCreated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [review, setReview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      setError('Dish title must be at least 3 characters.');
      return;
    }
    if (description.trim().length < 5) {
      setError('Please provide a description of at least 5 characters.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      const data = await api.createPost({
        title: title.trim(),
        tag: tag.trim(),
        description: description.trim(),
        review: review.trim(),
        image: imageUrl.trim()
      });

      if (onPostCreated) onPostCreated(data.post);

      setSuccess('Post created successfully!');
      setTimeout(() => {
        setTitle('');
        setTag('');
        setDescription('');
        setReview('');
        setImageUrl('');
        setSuccess('');
        setIsOpen(false);
      }, 1000);
    } catch (err) {
      setError(err.message || 'Could not create post.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-6">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="btn w-full py-3.5 text-base">
          + Create New Dish Post
        </button>
      ) : (
        <div className="p-6 bg-forkful-card rounded-xl border border-forkful-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="m-0 text-forkful-primary font-display text-xl">Share a New Dish</h3>
            <button onClick={() => setIsOpen(false)} className="btn btn-outline text-sm px-2.5 py-1">Close</button>
          </div>

          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          {success && <div className="text-green-700 text-sm mb-2">{success}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <input
              type="text"
              placeholder="Dish Name (e.g., Truffle Gnocchi)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Tags (e.g., #Italian #Homemade)"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <input
              type="url"
              placeholder="Image URL (optional, or uses delicious default photo)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <textarea
              placeholder="Brief description of the dish..."
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <textarea
              placeholder="Your review, tasting notes, or recipe tips..."
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button type="submit" className="btn mt-2" disabled={submitting}>
              {submitting ? 'Publishing...' : 'Publish Post'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
