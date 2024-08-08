import './App.css';
import "./Reusables.css";

import { SearchArea } from './Components/SearchArea.jsx';
import { Map } from "./Components/Map.jsx";

function App() {

  return (
    <>
      <div className="app flex-s-s flex-dir-row">

        {/* Components */}
        <SearchArea />
        <Map />

      </div>
    </>
  );
  
}

export default App
