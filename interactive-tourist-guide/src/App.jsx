import './App.css';
import "./Reusables.css";

import { SearchArea } from './Components/SearchArea.jsx';
import { Map } from "./Components/Map.jsx";

function App() {

  return (
    <>
      <div className="flex-s-s flex-dir-row">
        <SearchArea />
        <Map />
      </div>
    </>
  );
  
}

export default App
