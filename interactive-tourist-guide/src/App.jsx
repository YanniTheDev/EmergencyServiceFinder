import './App.css';
import "./Reusables.css";

import { SearchArea } from './Components/SearchArea.jsx';
import { Map } from "./Components/Map.jsx";

import { createContext, useContext } from 'react';

export const AppContext = createContext();

function App() {

  const apiKey = import.meta.env.VITE_HERE_API_KEY;

  return (
    <>
      <div className="app flex-s-s flex-dir-row">

        {/* Components */}
        {/* Using props! */}
        <SearchArea apiKey={apiKey}/> 
        <Map apiKey={apiKey} />

        { /*
        <AppContext.Provider value={{restaurantCoords, setRestaurantCoords}}>
          {/* Components */}
          {/* Using props! */}
        {/*
          <SearchArea apiKey={apiKey}/> 
          <Map apiKey={apiKey} />
        </AppContext.Provider>
        */ }

      </div>
    </>
  );
  
}

export default App
