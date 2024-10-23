import { useState, useRef } from "react";

import Axios from "axios";

import { Map } from "./Map.jsx";

import "../ComponentCSS/Content.css";
import "../Reusables.css";

import loadingWheel from "../Images/loading.png";

export const AppContent = (props) => {

    const [address, setAddress] = useState("");

    //Sets the address state to whatever the user puts in the input field
    const getAddress = (event) => {
        setAddress(event.target.value);
    }
    
    const [maxTravelDistance, setMaxTravelDistance] = useState(0);

    //Similar to the address state
    const getMaxTravelDistance = (event) => {
        setMaxTravelDistance(event.target.value);
    }

    const [loading, setLoading] = useState(false);
    
    //Since start of program is not loading anything, we defaultly set the state to false
    const finishLoading = () => {
        setLoading(false);
    }
    
    //Default coords of which the map should be centered at
    const [userCoord, setUserCoord] = useState({lat: 21, lng: 61.144}); 

    const [errorCode, setErrorCode] = useState(undefined);

    const geoCodeAddress = () => {

        //If the address is "truthy", then execute code inside the if statement
        if (address) {

            //Now it is loading so display loading wheel
            setLoading(true);

            let url = `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${props.apiKey}`

            //API REQUEST!
            Axios.get(url).then((response) => {

                let apiResponseCoords = response.data.items[0].position;

                setUserCoord(apiResponseCoords);

                findRestaurants(apiResponseCoords);

            }).catch((error) => {
                //If something goes wrong, then log that error
                console.error("Address does not exist in database!" + error);
                setErrorCode(1);
                setLoading(false);
            })
        }
        else {
            //If the address is not truthy, then it will warn the user that nothing has happened and it is most likely because the address is likely to be empty
            console.warn("Address is likely to be empty!");
            setErrorCode(0);
        }
    }

    const [validRestaurants, setValidRestaurants] = useState([]);

    let inDistanceRestaurants = [];

    //Function to find restaurants with the coords of the user
    const findRestaurants = (coords) => {

        let url = `https://discover.search.hereapi.com/v1/discover?at=${coords.lat},${coords.lng}&q=restaurants&apiKey=${props.apiKey}`
    
        //API REQUEST!!
        Axios.get(url).then((response) => {
            const restaurants = response.data.items;

            inDistanceRestaurants = restaurants.filter(
                //converting the distance from metres to kilometres
                (element) => ((element.distance / 1000) <= maxTravelDistance)
            );

            //Truncates the inDistanceRestaurant array to 8 restaurants
            if (inDistanceRestaurants.length > 8) {
                inDistanceRestaurants.length = 8;
            }
                
            setValidRestaurants(inDistanceRestaurants);

            //Calls the function to add markers to the map
            mapRef.current.addRestaurantMarkers(inDistanceRestaurants);

            //Calculates the routes and draws them
            mapRef.current.handleRoutes(inDistanceRestaurants);

        }).catch((error) => {
            console.error(error);
        })
    }

    const mapRef = useRef();

    //Rendering things
    return (
        <div className={props.isMobile ? "content-area flex-s-s flex-dir-col" : "content-area flex-s-s flex-dir-row"}>
            <div className="search-area flex-dir-col flex-c-c">
                <div className="address-container flex-dir-col flex-c-c">
                    <h1>Enter Your Address</h1>

                    <input type="text" placeholder="e.g. 3 Jo Road, Nelson, New Zealand" onChange={getAddress}/>
                </div>

                <div className="distance-container flex-dir-col flex-c-c">
                    <h1>Maximum Travel Distance (KM)</h1>

                    <input type="number" placeholder="e.g. 35" min={0} onChange={getMaxTravelDistance}/>
                </div>

                <button onClick={geoCodeAddress} title="Finds the nearest 8 restaurants!">
                    Find Restaurants
                </button>

                <div className="error-message-container">
                    <h3>{errorCode == 0 ? "Please ensure that you have entered an address" : errorCode == 1 ? "The address that you have entered does not exist in our database" : ""}</h3>
                </div>
            </div>

            {
                loading && (
                    <div className="loading-container">
                        <div className="loading-screen">
                            <img src={loadingWheel} alt="Loading wheel" className="loading-wheel"/>
                        </div>
                    </div>
                )
            }

            <Map apiKey={props.apiKey} userCoord={userCoord} finishLoading={finishLoading} isMobile={props.isMobile} ref={mapRef}/>

        </div>
    );
}