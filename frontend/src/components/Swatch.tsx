import { useState } from "react";
import "./Swatch.css";

interface SwatchProps {
  color: string;
  colorSpace: string;
  colorSpaceString: string;
  isLight: boolean;
}

const Swatch: React.FC<SwatchProps> = ({
  color,
  colorSpace,
  colorSpaceString,
  isLight,
}) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(color);
    //show toast copied to clipboard
  };

  const handleToggleLockColor = () => {
    setIsLocked((prev) => {
      if (prev) {
        // add a color to be fetched
      } else {
        // remove a color to be fetched
      }

      return !prev;
    });
  };

  const [isLocked, setIsLocked] = useState(false);

  return (
    <div
      style={{ backgroundColor: color }}
      className={`swatch ${isLight && "swatch--dark"}`}
    >
      <button onClick={handleToggleLockColor}>
        {isLocked ? "Unlock" : "Lock"}
      </button>
      <button className={"swatch__hex"} onClick={handleCopyToClipboard}>
        {color.toUpperCase()}
      </button>
      <span>{colorSpaceString}</span>
    </div>
  );
};

export default Swatch;
