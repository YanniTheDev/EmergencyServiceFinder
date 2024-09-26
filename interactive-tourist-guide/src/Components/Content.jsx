import { useState, useRef } from "react";

import Axios from "axios";

import { Map } from "./Map.jsx";

import "../ComponentCSS/Content.css";
import "../Reusables.css";

export const AppContent = (props) => {

    const [address, setAddress] = useState("");
    const getAddress = (event) => {
        setAddress(event.target.value);
    }
    
    const [maxTravelDistance, setMaxTravelDistance] = useState(0);
    const getMaxTravelDistance = (event) => {
        setMaxTravelDistance(event.target.value);
    }

    const [userCoord, setUserCoord] = useState({});

    const geoCodeAddress = () => {
        let url = `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${props.apiKey}`

        //API REQUEST!
        Axios.get(url).then((response) => {

            let apiResponseCoords = response.data.items[0].position;

            setUserCoord(apiResponseCoords);

            findRestaurants(apiResponseCoords);
        }).catch((error) => {
            console.error(error);
        })
    }

    const [validRestaurants, setValidRestaurants] = useState([]);

    const findRestaurants = (coords) => {

        let url = `https://discover.search.hereapi.com/v1/discover?at=${coords.lat},${coords.lng}&q=restaurants&apiKey=${props.apiKey}`
    
        //API REQUEST!!
        Axios.get(url).then((response) => {

            //Weird React thing going on. Why make new variable am i right???
            let restaurants = response.data.items;

            let inDistanceRestaurants = restaurants.filter(
                //converting the distance from metres to kilometres
                (element) => ((element.distance / 1000) <= maxTravelDistance)
            ) 
            
            setValidRestaurants(inDistanceRestaurants);

        }).catch((error) => {
            console.error(error);
        })

        //Calls the function to add markers to the map
        mapRef.current.addRestaurantMarkers();
        //Calls the function to display the map
        mapRef.current.displayMap();
    }

    const mapRef = useRef();

    return (
        <div className="content-area flex-s-s flex-dir-row">
            <div className="search-area flex-dir-col flex-c-c">
                <div className="address-container flex-dir-col flex-c-c">
                    <h1>Enter Your Address</h1>

                    <input type="text" placeholder="e.g. 3 Jo Road, Nelson, New Zealand" onChange={getAddress}/>
                </div>

                <div className="distance-container flex-dir-col flex-c-c">
                    <h1>Maximum Travel Distance (KM)</h1>

                    <input type="number" placeholder="e.g. 35" onChange={getMaxTravelDistance}/>
                </div>

                <button onClick={geoCodeAddress}>
                    Find Restaurants
                </button>
            </div>

            <Map apiKey={props.apiKey} userCoord={userCoord} validRestaurants={validRestaurants} ref={mapRef}/>

        </div>
    );
}