import { useCalculator } from "../hooks/useCalculator";
import {
  PROPERTY_TYPES,
  STATES,
  COMPLETION_YEARS,
  BUILD_TYPES,
  WALL_TYPES,
  FEATURES,
} from "../data";
import FeatureToggle from "./Toggle";
import TriToggle from "./Tritoggle";

const FINISH_LABELS = ["Economy", "Standard", "Premium", "Luxury"];

function StepLabel({ children }) {
  return (
    <div className="flex items-center gap-2.5 text-[13.5px] tracking-wide uppercase text-ink font-bold bg-highlight-soft px-3.5 py-2.5 rounded-brand mb-4.5 mt-7 first:mt-0">
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] text-ink-soft font-semibold">{label}</span>
      {children}
    </label>
  );
}

export default function Calculator() {
  const calc = useCalculator();
  const fmt = (n) => "$" + Math.round(n).toLocaleString("en-AU");

  return (
    <div className="max-w-full mx-auto pb-15 sm:pb-30 px-5 sm:px-10 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-7 items-start">
      {/* INPUT PANEL */}
      <div className="bg-paper-raised border border-line rounded-brand p-8">
        <StepLabel>Property details</StepLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Field label="Investment property type">
            <select
              className="input"
              value={calc.propertyType}
              onChange={(e) => calc.setPropertyType(e.target.value)}
            >
              <option value="" disabled hidden>
                Select...
              </option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Investment property state">
            <select
              className="input"
              value={calc.state}
              onChange={(e) => calc.setState(e.target.value)}
            >
              <option value="" disabled hidden>
                Select...
              </option>
              {STATES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Field label="Construction completion year">
            <select
              className="input"
              value={calc.completionYear}
              onChange={(e) => calc.setCompletionYear(e.target.value)}
            >
              <option value="" disabled hidden>
                Select...
              </option>
              {COMPLETION_YEARS.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </Field>
          <Field label="Build type">
            <select
              className="input"
              value={calc.buildType}
              onChange={(e) => calc.setBuildType(e.target.value)}
            >
              <option value="" disabled hidden>
                Select...
              </option>
              {BUILD_TYPES.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>
        </div>

        <StepLabel>Size &amp; features</StepLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <Field label="Floor area">
            <div className="relative">
              <input
                type="number"
                className="input pr-11"
                value={calc.area}
                placeholder="e.g. 220"
                onChange={(e) => calc.setArea(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-ink-soft font-num">
                m²
              </span>
            </div>
          </Field>
          <Field label="Bedrooms">
            <input
              type="number"
              className="input"
              value={calc.beds}
              placeholder=""
              onChange={(e) => calc.setBeds(e.target.value)}
            />
          </Field>
          <Field label="Number of floors">
            <input
              type="number"
              className="input"
              value={calc.floors}
              placeholder=""
              onChange={(e) => calc.setFloors(e.target.value)}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <Field label="Wall type">
            <select
              className="input"
              value={calc.wallType}
              onChange={(e) => calc.setWallType(e.target.value)}
            >
              <option value="" disabled hidden>
                Select...
              </option>
              {WALL_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="w-full">
          {FEATURES.map((f) => (
            <FeatureToggle
              key={f.key}
              label={f.fieldLabel}
              checked={calc.features[f.key]}
              onChange={(v) => calc.toggleFeature(f.key, v)}
            />
          ))}
        </div>

        <StepLabel>Finish level</StepLabel>
        <TriToggle
          options={FINISH_LABELS}
          value={calc.finishLevel}
          onChange={calc.setFinishLevel}
        />

        <p className="text-xs text-ink-soft mt-4 leading-relaxed">
          This is an indicative estimate only. For an accurate quote, a quantity
          surveyor can assess your final plans.
        </p>
      </div>

    {/* RESULT PANEL */}
    <div
    className={`bg-paper-raised border border-line rounded-brand p-7 md:sticky md:top-6 transition-opacity ${
        calc.result.isComplete ? "" : "opacity-50 grayscale pointer-events-none"
    }`}
    >
    {calc.result.isComplete ? (
        <>
        <div className="font-num text-4xl font-bold tracking-tight text-highlight tabular-nums mb-1">
            {fmt(calc.result.total)}
        </div>
        <div className="sm:text-md tracking-wide bg-highlight text-paper-raised sm:font-semibold text-xs font-normal px-1 py-1">
            {calc.finishName} finish
        </div>
        <div className="flex justify-between py-2 pt-4 px-1">
            <div className="text-xs text-ink-soft font-normal">Low estimate</div>
            <div className="text-xs text-ink-soft font-normal">{fmt(calc.result.low)}</div>
        </div>
        <div className="flex justify-between py-1 px-1 pb-5">
            <div className="text-xs text-ink-soft font-normal">High estimate </div>
            <div className="text-xs text-ink-soft font-normal">{fmt(calc.result.high)} </div>
        </div>

        <div className="text-[13px] font-semibold text-ink border-t border-line pt-2">
            What affects your estimate
        </div>
        <ul className="list-none m-0 p-0">
            {[
            "Property type sets a base allowance.",
            "Wall type adds to the base.",
            calc.activeFeatureLabels.length
                ? `Selected options add to the base — currently: ${calc.activeFeatureLabels.join(", ")}.`
                : "Selected options add to the base.",
            "Storeys and bedrooms apply small multipliers.",
            "Floor area scales the whole result.",
            "Location & year index adjusts for local build costs.",
            ].map((line, i) => (
            <li
                key={i}
                className="relative pl-4.5 py-2 text-[13.5px] text-ink-soft leading-relaxed border-b border-dotted border-line last:border-b-0"
            >
                <span className="absolute left-0 top-2 text-emerald font-bold">*</span>
                {line}
            </li>
            ))}
        </ul>

        <p className="text-[12.5px] text-ink-soft py-3 border-t border-line">
            Location &amp; year index applied:{" "}
            <strong className="font-num tabular-nums text-ink font-semibold">
            {calc.result.locationYearIndex.toFixed(3)}
            </strong>{" "}
            <span className="text-[#8B93A0]">
            ({calc.state} · {calc.completionYear})
            </span>
        </p>

        <p className="text-[11.5px] text-[#8B93A0] leading-relaxed py-4 border-t border-line">
            **This estimate reflects the factors above at a high level and excludes land cost, council fees
            and site-specific conditions. It is indicative only and not a substitute for a quantity surveyor's
            assessment.
        </p>
        <div className="flex flex-col sm:flex-row justify-between border-t py-3 border-line">
            <p className="text-md text-ink-soft leading-relaxed py-2 font-semibold">Want to learn more?</p>
            <button className="bg-highlight border border-white/30 text-paper px-4 py-2 rounded-brand text-[13px] font-bold shrink-0 whitespace-nowrap">
            Speak to a specialist
            </button>
        </div>
        </>
    ) : (
        <div className="py-16 text-center text-sm text-ink-soft">
        Fill in the details on the left to see your estimate.
        </div>
    )}
    </div>
    </div>
)}