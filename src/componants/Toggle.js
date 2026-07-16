export default function FeatureToggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-dotted border-line last:border-b-0">
      <label className="text-sm text-ink font-medium">{label}</label>
      <div className="flex border border-line rounded overflow-hidden">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`px-4.5 py-2 text-sm font-semibold border-r border-line ${
            !checked ? "bg-paper text-ink" : "bg-paper-raised text-ink-soft"
          }`}
        >
          No
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`px-4.5 py-2 text-sm font-semibold ${
            checked ? "bg-ink text-white" : "bg-paper-raised text-ink-soft"
          }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}
