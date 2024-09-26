import './App.css';
import "./Reusables.css";

import { SearchArea } from './Components/SearchArea.jsx';
import { Map } from "./Components/Map.jsx";

import { AppContent } from "./Components/Content.jsx";

import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

function App() {

  const apiKey = import.meta.env.VITE_HERE_API_KEY;

  const [validRestaurants, setValidRestaurants] = useState([]);
  const [displayMarker, setDisplayMarker] = useState(0);
  const [userCoord, setUserCoord] = useState({lat: 64.144, lng: -21.94});

  return (
    <>
      <div className="app flex-s-s flex-dir-row">

        {/* Components
        {/* Using props! */}
        {/*}
        <SearchArea apiKey={apiKey}/> 
        <Map apiKey={apiKey} /> */}

        {/* <AppContext.Provider value={{ restaurants: [validRestaurants, setValidRestaurants], marker: [displayMarker, setDisplayMarker], user: [userCoord, setUserCoord]}}>
          {/* Components */}
          {/* Using props! */}
        {/*
          <SearchArea apiKey={apiKey}/> 
          <Map apiKey={apiKey} />
        </AppContext.Provider> */}

        <AppContent apiKey={apiKey}/>

      </div>
    </>
  );
  
}

export default App
