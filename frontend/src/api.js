// frontend/src/api.js
// Thin wrapper around the native Fetch API for talking to the Forkful backend.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function authHeaders() {
  const token = localStorage.getItem('forkful_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) Object.assign(headers, authHeaders());

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = { success: false, message: 'The server returned an unexpected response.' };
  }

  if (!res.ok) {
    const err = new Error(data.message || `Request failed with status ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {
  // Auth
  register: (payload) => request('/api/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: payload }),
  me: () => request('/api/auth/me', { auth: true }),

  // Users / profiles
  getUser: (id) => request(`/api/users/${id}`, { auth: true }),
  updateUser: (id, payload) => request(`/api/users/${id}`, { method: 'PUT', body: payload, auth: true }),
  searchUsers: (q) => request(`/api/users?q=${encodeURIComponent(q)}`),

  // Posts
  getPosts: (scope = 'global', search = '') =>
    request(`/api/posts?scope=${scope}${search ? `&search=${encodeURIComponent(search)}` : ''}`, { auth: true }),
  getPost: (id) => request(`/api/posts/${id}`),
  createPost: (payload) => request('/api/posts', { method: 'POST', body: payload, auth: true }),
  updatePost: (id, payload) => request(`/api/posts/${id}`, { method: 'PUT', body: payload, auth: true }),
  deletePost: (id) => request(`/api/posts/${id}`, { method: 'DELETE', auth: true }),
  likePost: (id) => request(`/api/posts/${id}/like`, { method: 'POST', auth: true }),
  addComment: (id, payload) => request(`/api/posts/${id}/comments`, { method: 'POST', body: payload, auth: true }),
  reportPost: (id, reason) => request(`/api/posts/${id}/report`, { method: 'POST', body: { reason }, auth: true }),

  // Albums
  getAlbums: (ownerId) => request(`/api/albums${ownerId ? `?owner=${ownerId}` : ''}`),
  getAlbum: (id) => request(`/api/albums/${id}`),
  createAlbum: (payload) => request('/api/albums', { method: 'POST', body: payload, auth: true }),
  updateAlbum: (id, payload) => request(`/api/albums/${id}`, { method: 'PUT', body: payload, auth: true }),
  deleteAlbum: (id) => request(`/api/albums/${id}`, { method: 'DELETE', auth: true }),
  addPostToAlbum: (albumId, postId) => request(`/api/albums/${albumId}/posts`, { method: 'POST', body: { postId }, auth: true }),
  removePostFromAlbum: (albumId, postId) => request(`/api/albums/${albumId}/posts/${postId}`, { method: 'DELETE', auth: true }),

  // Friends
  sendFriendRequest: (targetId) => request('/api/friends/request', { method: 'POST', body: { targetId }, auth: true }),
  acceptFriendRequest: (friendshipId) => request('/api/friends/accept', { method: 'POST', body: { friendshipId }, auth: true }),
  declineFriendRequest: (friendshipId) => request('/api/friends/decline', { method: 'POST', body: { friendshipId }, auth: true }),
  unfriend: (targetId) => request('/api/friends/unfriend', { method: 'POST', body: { targetId }, auth: true }),
  getFriendRequests: () => request('/api/friends/requests', { auth: true })
};

export default api;