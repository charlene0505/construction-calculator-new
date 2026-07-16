import { useState, useMemo } from "react";
import {
  PROPERTY_BASE_RATE,
  WALL_POINTS,
  BCI,
  FEATURES,
  FEATURE_POINTS,
  FINISH_NAMES,
  FINISH_MULTIPLIERS,
} from "../data";

function bciIndexForYear(yearText) {
  if (!yearText) return 1;
  if (yearText === "< Sept 1987") return 0;
  if (yearText === "Sept 1987") return 1;
  const y = parseInt(yearText, 10);
  if (!Number.isFinite(y)) return 1;
  return Math.max(0, Math.min(39, y - 1987));
}

function getBCI(stateKey, yearText) {
  const idx = bciIndexForYear(yearText);
  const arr = BCI[stateKey || "NSW"];
  const v = arr && arr[idx];
  return Number.isFinite(v) ? v : 1;
}

function bedroomsFactor(n) {
  const b = Math.max(1, Math.min(5, Number(n) || 0));
  if (b === 1) return -0.08;
  if (b === 2) return -0.04;
  if (b === 3) return 0;
  if (b === 4) return 0.04;
  return 0.08;
}

function storeysOffset(floors) {
  const n = Math.max(1, Math.floor(Number(floors) || 1));
  if (n >= 8) return 10;
  return Math.max(0, n - 1);
}

export function useCalculator() {
  const [propertyType, setPropertyType] = useState("");
  const [state, setState] = useState("");
  const [completionYear, setCompletionYear] = useState("");
  const [buildType, setBuildType] = useState(""); // not used by the cost formula
  const [wallType, setWallType] = useState("");
  const [area, setArea] = useState("");
  const [beds, setBeds] = useState("");
  const [floors, setFloors] = useState("");

  const [features, setFeatures] = useState(() =>
    Object.fromEntries(FEATURES.map((f) => [f.key, false])),
  );
  const toggleFeature = (key, value) =>
    setFeatures((prev) => ({ ...prev, [key]: value }));

  const [finishLevel, setFinishLevel] = useState(null); // null = not chosen yet

  const result = useMemo(() => {
    const isComplete =
      propertyType !== "" &&
      state !== "" &&
      completionYear !== "" &&
      wallType !== "" &&
      area !== "" &&
      beds !== "" &&
      floors !== "" &&
      finishLevel !== null;

    if (!isComplete) {
      return {
        total: null,
        low: null,
        high: null,
        locationYearIndex: null,
        isComplete: false,
      };
    }

    const safeArea = Math.max(0, Number(area) || 0);
    const propBase = PROPERTY_BASE_RATE[propertyType] || 0;
    const wallPts = WALL_POINTS[wallType] || 0;
    const airconPts = features.aircon ? FEATURE_POINTS.aircon : 0;

    const floorsOffset = storeysOffset(floors);
    const bedsFactor = bedroomsFactor(beds);

    const baseCost =
      (propBase + wallPts + airconPts) *
      (1 + floorsOffset * 0.04) *
      (1 + bedsFactor) *
      safeArea;

    const locationYearIndex = getBCI(state, completionYear);
    const baseCalc = baseCost * locationYearIndex;

    const band = FINISH_MULTIPLIERS.map((m) => Math.round(baseCalc * m));

    return {
      total: band[finishLevel],
      low: band[0],
      high: band[band.length - 1],
      locationYearIndex,
      isComplete: true,
    };
  }, [
    propertyType,
    state,
    completionYear,
    wallType,
    area,
    beds,
    floors,
    features,
    finishLevel,
  ]);

  const activeFeatureLabels = useMemo(
    () => FEATURES.filter((f) => features[f.key]).map((f) => f.fieldLabel),
    [features],
  );

  return {
    propertyType,
    setPropertyType,
    state,
    setState,
    completionYear,
    setCompletionYear,
    buildType,
    setBuildType,
    area,
    setArea,
    beds,
    setBeds,
    floors,
    setFloors,
    wallType,
    setWallType,
    features,
    toggleFeature,
    activeFeatureLabels,
    finishLevel,
    setFinishLevel,
    finishName: finishLevel !== null ? FINISH_NAMES[finishLevel] : "",
    result,
  };
}
