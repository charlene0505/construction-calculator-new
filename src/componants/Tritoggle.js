export default function TriToggle({ options, value, onChange }) {
  return (
    <div className="flex border border-line rounded overflow-hidden">
      {options.map((opt, i) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(i)}
          className={`flex-1 py-2.5 px-3 text-md font-semibold text-center border-r border-line last:border-r-0 ${
            value === i ? "bg-ink text-white" : "bg-paper-raised text-ink-soft"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
