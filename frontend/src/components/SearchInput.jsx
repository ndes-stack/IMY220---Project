import { SearchIcon } from './Icons';

export default function SearchInput({ value = '', onChange }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: '16px', pointerEvents: 'none', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
          <SearchIcon size={18} />
        </div>
        <input
          type="text"
          placeholder="Search dishes, recipes, ingredients, chefs..."
          value={value}
          onChange={onChange}
          style={{
            width: '100%',
            padding: '0.85rem 1.2rem 0.85rem 2.8rem',
            borderRadius: '50px',
            border: '2px solid var(--border-color)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>
    </div>
  );
}
