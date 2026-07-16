import { useCalculator } from "./hooks/useCalculator";
import {
  PROPERTY_TYPES,
  STATES,
  COMPLETION_YEARS,
  BUILD_TYPES,
  WALL_TYPES,
  FEATURES,
} from "./data";

function App() {
  const calc = useCalculator();

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4 font-body text-ink">
      <h1 className="text-xl font-display font-semibold">
        Cost Calculator (test UI)
      </h1>

      <label className="block">
        Property type
        <select
          className="border ml-2"
          value={calc.propertyType}
          onChange={(e) => calc.setPropertyType(e.target.value)}
        >
          {PROPERTY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        State
        <select
          className="border ml-2"
          value={calc.state}
          onChange={(e) => calc.setState(e.target.value)}
        >
          {STATES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        Completion year
        <select
          className="border ml-2"
          value={calc.completionYear}
          onChange={(e) => calc.setCompletionYear(e.target.value)}
        >
          {COMPLETION_YEARS.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>

      <label className="block">
        Build type
        <select
          className="border ml-2"
          value={calc.buildType}
          onChange={(e) => calc.setBuildType(e.target.value)}
        >
          {BUILD_TYPES.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </label>

      <label className="block">
        Wall type
        <select
          className="border ml-2"
          value={calc.wallType}
          onChange={(e) => calc.setWallType(e.target.value)}
        >
          {WALL_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        Floor area (m²)
        <input
          type="number"
          className="border ml-2 w-24"
          value={calc.area}
          onChange={(e) => calc.setArea(e.target.value)}
        />
      </label>

      <label className="block">
        Bedrooms
        <input
          type="number"
          className="border ml-2 w-24"
          value={calc.beds}
          onChange={(e) => calc.setBeds(e.target.value)}
        />
      </label>

      <label className="block">
        Floors
        <input
          type="number"
          className="border ml-2 w-24"
          value={calc.floors}
          onChange={(e) => calc.setFloors(e.target.value)}
        />
      </label>

      <fieldset className="space-y-1">
        <legend className="font-medium">Features</legend>
        {FEATURES.map((f) => (
          <label key={f.key} className="block">
            <input
              type="checkbox"
              className="mr-2"
              checked={calc.features[f.key]}
              onChange={(e) => calc.toggleFeature(f.key, e.target.checked)}
            />
            {f.fieldLabel}
          </label>
        ))}
      </fieldset>

      <label className="block">
        Finish level
        <select
          className="border ml-2"
          value={calc.finishLevel}
          onChange={(e) => calc.setFinishLevel(Number(e.target.value))}
        >
          <option value={0}>Economy</option>
          <option value={1}>Standard</option>
          <option value={2}>Premium</option>
          <option value={3}>Luxury</option>
        </select>
      </label>

      <hr />

      <div className="font-num text-lg">
        <div>Total: ${calc.result.total.toLocaleString()}</div>
        <div>Low: ${calc.result.low.toLocaleString()}</div>
        <div>High: ${calc.result.high.toLocaleString()}</div>
        <div>Index: {calc.result.locationYearIndex.toFixed(3)}</div>
      </div>
    </div>
  );
}

export default App;
