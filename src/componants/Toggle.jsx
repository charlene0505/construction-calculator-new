export default function FeatureToggle({ label, checked, onChange }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 border-b border-dotted border-line last:border-b-0 w-full">
      <label className="text-sm text-ink font-medium">{label}</label>
      <div className="flex border border-line rounded overflow-hidden w-full sm:w-64">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex-1 py-2.5 px-3 text-sm font-semibold text-center border-r border-line ${
            !checked ? "bg-ink text-white" : "bg-paper-raised text-ink-soft"
          }`}
        >
          No
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex-1 py-2.5 px-3 text-sm font-semibold text-center ${
            checked ? "bg-ink text-white" : "bg-paper-raised text-ink-soft"
          }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
}
