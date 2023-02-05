import React, { CSSProperties, useCallback } from "react";
import "./Swatches.css";
import Swatch from "./Swatch";
import { fetchSwatches, useSwatches } from "../contexts/SwatchesContext";
import useEventListener from "../hooks/useEventListener";

const Swatches: React.FC = () => {
  const { state, dispatch } = useSwatches();

  const handleOnClickSpace = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== " ") return;

      fetchSwatches(dispatch, state.total - state.lockedSwatches);
    },
    [dispatch, state]
  );
  useEventListener("keypress", handleOnClickSpace);

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
