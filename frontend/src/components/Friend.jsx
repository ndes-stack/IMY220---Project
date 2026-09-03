import ProfilePreview from './ProfilePreview';

export default function Friend({ friend }) {
  return (
    <div style={{ flex: '1 1 240px', maxWidth: '300px' }}>
      <ProfilePreview profile={friend} />
    </div>
  );
}
