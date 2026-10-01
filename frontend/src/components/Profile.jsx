import { useState } from 'react';
import EditProfile from './EditProfile';

export default function Profile({ profile, isOwnProfile, friendStatus, postCount, onUpdateProfile, onFriendAction }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [friendBusy, setFriendBusy] = useState(false);

  if (!profile) return null;

  const handleSave = async (updatedProfile) => {
    setSaving(true);
    try {
      await onUpdateProfile(updatedProfile);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleFriendClick = async (action) => {
    setFriendBusy(true);
    try {
      await onFriendAction(action);
    } finally {
      setFriendBusy(false);
    }
  };

  return (
    <section className="bg-forkful-card p-7 rounded-xl border border-forkful-border mb-8 shadow-sm">
      {isEditing ? (
        <EditProfile profile={profile} onSave={handleSave} onCancel={() => setIsEditing(false)} saving={saving} />
      ) : (
        <div>
          <div className="flex gap-7 items-start flex-wrap">
            <img
              src={profile.avatar || "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"}
              alt={profile.username}
              className="w-28 h-28 rounded-full object-cover border-4 border-forkful-border"
            />
            <div className="flex-1 min-w-[260px]">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h1 className="m-0 mb-1 text-3xl font-display uppercase tracking-wide">
                    {profile.username}
                  </h1>
                  <span className="text-forkful-muted italic text-base block">
                    {profile.subtitle || "home cook, obsessed with pasta"}
                  </span>
                </div>
                <div className="flex gap-2">
                  {isOwnProfile ? (
                    <button onClick={() => setIsEditing(true)} className="btn btn-outline">Edit Profile</button>
                  ) : (
                    <>
                      {friendStatus === 'none' && (
                        <button onClick={() => handleFriendClick('request')} disabled={friendBusy} className="btn">Add Friend</button>
                      )}
                      {friendStatus === 'pending-sent' && (
                        <button className="btn btn-outline" disabled>Request Sent</button>
                      )}
                      {friendStatus === 'pending-received' && (
                        <button onClick={() => handleFriendClick('accept')} disabled={friendBusy} className="btn">Accept Request</button>
                      )}
                      {friendStatus === 'friends' && (
                        <button onClick={() => handleFriendClick('unfriend')} disabled={friendBusy} className="btn btn-outline">Unfriend</button>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-6 my-4 text-sm">
                <span><strong>{profile.followers ?? 0}</strong> followers</span>
                <span><strong>{profile.following ?? 0}</strong> following</span>
                <span><strong>{postCount ?? 0}</strong> posts</span>
              </div>

              <p className="m-0 leading-relaxed">
                {profile.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
