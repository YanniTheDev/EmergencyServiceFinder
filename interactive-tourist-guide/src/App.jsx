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

  useEffect(() => {

    //Updates the windowWidth state
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    //Adds an event listener so that whenever the window gets resized, it will call the handleResize function
    window.addEventListener("resize", handleResize);

    //If the window width is less than a certain amount of pixels, we will re-arrange the layout of the website
    if (windowWidth <= 750) {
      contentElement.current.className = "app flex-s-s flex-dir-col";
    }
    else {
      contentElement.current.className = "app flex-s-s flex-dir-row";
    }

    //Removes the event listener as we only want one handleResized to be called once per render
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  //Creates a reference to the div so we can access its properties
  const contentElement = useRef(null);

  return (
    <>
      <div className="app flex-s-s flex-dir-row" ref={contentElement}>

        {/* Component */}
        <AppContent apiKey={apiKey}/>

      </div>
    </>
  );
  
}

export default App
