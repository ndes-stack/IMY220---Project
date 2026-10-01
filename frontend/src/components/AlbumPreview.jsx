import { Link } from 'react-router-dom';

export default function AlbumPreview({ album }) {
  if (!album) return null;

  return (
    <Link
      to={`/album/${album.id}`}
      className="block p-4 bg-forkful-card rounded-xl border border-forkful-border shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="m-0 mb-1 text-lg font-display text-forkful-ink">{album.name}</h3>
      <p className="m-0 mb-2 text-sm text-forkful-muted line-clamp-2">{album.description}</p>
      <div className="flex justify-between items-center text-xs text-forkful-muted">
        <span className="bg-forkful-primary-light text-forkful-primary px-2 py-0.5 rounded-full font-semibold">
          {album.tag}
        </span>
        <span>{(album.postIds || []).length} dishes</span>
      </div>
    </Link>
  );
}
