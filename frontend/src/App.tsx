import React from "react";
import "./App.css";
import Header from "./components/Header";
import Swatches from "./components/Swatches";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Swatches />
    </div>
  );
}

export default App;
