import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <div className="header">
      <h3>SWATCHES</h3>
      <hr></hr>
      <div>Press spacebar to generate color palette</div>
    </div>
  );
};

export default Header;
