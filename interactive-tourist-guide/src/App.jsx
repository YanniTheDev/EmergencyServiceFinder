import './App.css';
import "./Reusables.css";

import { SearchArea } from './Components/SearchArea.jsx';
import { Map } from "./Components/Map.jsx";

import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

function App() {

  const apiKey = import.meta.env.VITE_HERE_API_KEY;

  const [validRestaurants, setValidRestaurants] = useState([]);
  const [displayMarker, setDisplayMarker] = useState(0);

  return (
    <>
      <div className="app flex-s-s flex-dir-row">

        {/* Components
        {/* Using props! */}
        {/*}
        <SearchArea apiKey={apiKey}/> 
        <Map apiKey={apiKey} /> */}

        <AppContext.Provider value={{validRestaurants, setValidRestaurants, displayMarker, setDisplayMarker}}>
          {/* Components */}
          {/* Using props! */}
          <SearchArea apiKey={apiKey}/> 
          <Map apiKey={apiKey} />
        </AppContext.Provider>

      </div>
    </>
  );
  
}

export default App
