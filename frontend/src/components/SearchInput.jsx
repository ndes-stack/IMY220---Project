import { SearchIcon } from './Icons';

export default function SearchInput({ value = '', onChange }) {
  return (
    <div className="mb-6">
      <div className="relative max-w-2xl mx-auto flex items-center">
        <div className="absolute left-4 pointer-events-none flex items-center text-forkful-muted">
          <SearchIcon size={18} />
        </div>
        <input
          type="text"
          placeholder="Search dishes, recipes, ingredients, chefs..."
          value={value}
          onChange={onChange}
          className="w-full !pl-11 !pr-5 !py-3 !rounded-full shadow-sm text-base"
        />
      </div>
    </div>
  );
}
