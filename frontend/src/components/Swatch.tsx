import { useState } from "react";
import "./Swatch.css";
import { useSwatches } from "../contexts/SwatchesContext";

interface SwatchProps {
  color: string;
  colorSpace: string;
  colorSpaceString: string;
  isLight: boolean;
  locked: boolean;
}

const Swatch: React.FC<SwatchProps> = ({
  color,
  colorSpace,
  colorSpaceString,
  isLight,
  locked,
}) => {
  const { dispatch } = useSwatches();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(color);
    //show toast copied to clipboard
  };

  const handleToggleLockColor = () => {
    dispatch({ type: locked ? "unlock" : "lock", id: color });
  };

  return (
    <div
      style={{ backgroundColor: color }}
      className={`swatch ${isLight && "swatch--dark"}`}
    >
      <button onClick={handleToggleLockColor}>
        {locked ? "Unlock" : "Lock"}
      </button>
      <button className={"swatch__hex"} onClick={handleCopyToClipboard}>
        {color.toUpperCase()}
      </button>
      <span>{colorSpaceString}</span>
    </div>
  );
};

export default Swatch;
