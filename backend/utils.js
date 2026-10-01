// Shared helpers for turning Mongo documents into plain JSON-friendly objects.

function publicUser(user) {
  if (!user) return null;
  const { _id, passwordHash, ...rest } = user;
  return { id: _id.toString(), ...rest };
}

function publicPost(post) {
  if (!post) return null;
  const { _id, ...rest } = post;
  return {
    id: _id.toString(),
    ...rest,
    comments: (post.comments || []).map((c) => ({ ...c }))
  };
}

function publicAlbum(album) {
  if (!album) return null;
  const { _id, ...rest } = album;
  return { id: _id.toString(), ...rest };
}

function publicReport(report) {
  if (!report) return null;
  const { _id, ...rest } = report;
  return { id: _id.toString(), ...rest };
}

module.exports = { publicUser, publicPost, publicAlbum, publicReport };
