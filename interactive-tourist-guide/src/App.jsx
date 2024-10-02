import './App.css';
import "./Reusables.css";

import { AppContent } from "./Components/Content.jsx";

import { createContext } from 'react';

export const AppContext = createContext();

function App() {

  const apiKey = import.meta.env.VITE_HERE_API_KEY;

  return (
    <>
      <div className="app flex-s-s flex-dir-row">

        <AppContent apiKey={apiKey}/>

      </div>
    </>
  );
  
}

export default App
