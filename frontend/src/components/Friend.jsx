import ProfilePreview from './ProfilePreview';

export default function Friend({ friend }) {
  return (
    <div className="flex-1 min-w-[240px] max-w-[300px]">
      <ProfilePreview profile={friend} />
    </div>
  );
}
