import { useState } from "react";

import Axios from "axios";

import "../ComponentCSS/SearchArea.css";
import "../Reusables.css"

export const SearchArea = (props) => {

    const [address, setAddress] = useState("");
    const getAddress = (event) => {
        setAddress(event.target.value);
    }
    
    const [maxTravelDistance, setMaxTravelDistance] = useState(0);
    const getMaxTravelDistance = (event) => {
        setMaxTravelDistance(event.target.value);
    }


    const geoCodeAddress = () => {
        let url = `https://geocode.search.hereapi.com/v1/geocode?q=${address}&apiKey=${props.apiKey}`

        //API REQUEST!
        Axios.get(url).then((response) => {

            let apiResponseCoords = response.data.items[0].position;

            //Testing stuff
            //console.log(apiResponse);

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

            //validRestaurants[n].position.lat/lng for the position of the nth restaurant

            console.log(restaurants);
            console.log(inDistanceRestaurants);
            console.log(validRestaurants);

        }).catch((error) => {
            console.error(error);
        })
    }

    return (
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
    );
}