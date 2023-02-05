import React, { CSSProperties, useCallback, useEffect } from "react";
import "./Swatches.css";
import Swatch from "./Swatch";
import { fetchSwatches, useSwatches } from "../contexts/SwatchesContext";

interface SwatchesProps {
  count?: number;
}

const Swatches: React.FC<SwatchesProps> = ({ count = 5 }) => {
  const { state, dispatch } = useSwatches();

  const handleOnClickSpace = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== " ") return;

      fetchSwatches(dispatch, state.total - state.lockedSwatches);
    },
    [dispatch, state]
  );

  useEffect(() => {
    document.addEventListener("keypress", handleOnClickSpace);
    return () => {
      document.removeEventListener("keypress", handleOnClickSpace);
    };
  }, [handleOnClickSpace]);

  return (
    <div
      className="swatches-container"
      style={{ "--num-of-colors": state.total } as CSSProperties}
    >
      {Object.values(state.swatches)
        .sort((a, b) => a.ordering - b.ordering)
        .map((color, index) => {
          return (
            color.hex && (
              <Swatch
                key={color.colorString + index}
                color={color.hex}
                colorSpace={color.colorString}
                isLight={color.tone === "light"}
                locked={color.locked}
              />
            )
          );
        })}
    </div>
  );
};

export default Swatches;
