import React, { CSSProperties, useEffect } from "react";
import "./Swatches.css";
import useSwatches from "../hooks/useSwatches";
import Swatch from "./Swatch";

interface SwatchesProps {
  count?: number;
}

const Swatches: React.FC<SwatchesProps> = ({ count = 5 }) => {
  const { swatches, limit, fetchSwatches } = useSwatches(count);

  useEffect(() => {
    const handleOnClickSpace = (event: KeyboardEvent) => {
      if (event.key !== " ") {
        return;
      }
      fetchSwatches();
    };

    document.addEventListener("keypress", handleOnClickSpace);
    return () => {
      document.removeEventListener("keypress", handleOnClickSpace);
    };
  }, [fetchSwatches]);

  return (
    <div
      className="swatches-container"
      style={{ "--num-of-colors": limit } as CSSProperties}
    >
      {swatches.map((color, index) => (
        <Swatch
          key={color.colorString + index}
          color={color.hex}
          colorSpace={color.type}
          colorSpaceString={color.colorString}
          isLight={color.tone === "light"}
        />
      ))}
    </div>
  );
};

export default Swatches;
