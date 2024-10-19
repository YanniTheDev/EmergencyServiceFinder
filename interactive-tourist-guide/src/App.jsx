//I have split CSS files so that each component has their own CSS file.
//Reusables.css are for styles that are use universally
import './App.css';
import "./Reusables.css";

import { AppContent } from "./Components/Content.jsx";

import { useState, useEffect, useRef } from 'react';

function App() {

  //API key that is important from the .env file so it is secure and people cannot randomly access it
  const apiKey = import.meta.env.VITE_HERE_API_KEY;

  //Getting the window width to allow responsiveness of website
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 750);

  //This key state allows us to force re-renders
  const [key, setKey] = useState(0);

  useEffect(() => {

    //Updates the windowWidth state
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    //Adds an event listener so that whenever the window gets resized, it will call the handleResize function
    window.addEventListener("resize", handleResize);

    const mobile = window.innerWidth < 750;
    setIsMobile(mobile);
    setKey((current) => current + 1);

    //Removes the event listener as we only want one handleResized to be called once per render
    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  //Creates a reference to the div so we can access its properties
  const contentElement = useRef(null);

  return (
    <>
      <div className={isMobile ? "app flex-s-s flex-dir-col" : "app flex-s-s flex-dir-row"} ref={contentElement} key={key}>

        {/* Component */}
        <AppContent apiKey={apiKey} isMobile={isMobile}/>

      </div>
    </>
  );
  
}

export default App
