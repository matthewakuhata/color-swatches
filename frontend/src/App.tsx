import "./App.css";
import Header from "./components/Header";
import Swatches from "./components/Swatches";
import { SwatchProvider } from "./contexts/SwatchesContext";

function App() {
  return (
    <div className="App">
      <Header />
      <SwatchProvider defaultValues={{ total: 5 }}>
        <Swatches />
      </SwatchProvider>
    </div>
  );
}

export default App;
