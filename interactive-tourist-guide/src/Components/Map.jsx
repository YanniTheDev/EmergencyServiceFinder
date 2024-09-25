import "../ComponentCSS/MapArea.css";

import { useRef, useEffect, useContext } from "react";
import H from "@here/maps-api-for-javascript";

import { AppContext } from "../App";

export const Map = ({ apiKey }) => {

    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null);

    const { restaurants, marker, user } = useContext(AppContext);
    const [validRestaurants, setValidRestaurants] = restaurants;
    const [displayMarker, setDisplayMarker] = marker;
    // const [userCoord, setUserCoord] = user;
    
    useEffect(() => {
        // Check if the map object has already been created
        if (!map.current) {

            // Create a platform object with the API key and useCIT option
            platform.current = new H.service.Platform({
                apiKey
            });

            // Obtain the default map types from the platform object:
            const defaultLayers = platform.current.createDefaultLayers({
                pois: true
            });

            // const zoomCenter = userCoord;

            // Create a new map instance with the Tile layer, center and zoom level
            // Instantiate (and display) a map:
            const newMap = new H.Map(
                mapRef.current,
                defaultLayers.vector.normal.map, {
                    zoom: 3,
                    center: {
                        // ...zoomCenter,
                        lat: 21,
                        lng: 64.144,
                   },
                }
            );

            // Add panning and zooming behavior to the map
            const behavior = new H.mapevents.Behavior(
                new H.mapevents.MapEvents(newMap)
            );

            // Set the map object to the reference
            map.current = newMap;
        }
    }, [apiKey, displayMarker]);

    if (displayMarker == 1) {

        map.current.removeObjects(map.current.getObjects());

        validRestaurants.forEach(element => {
            
            let restaurantMarker = new H.map.Marker({lat: element.position.lat, lng: element.position.lng});
            try {
                map.current.addObject(restaurantMarker);
            } catch (error) {
                console.log(error)
            }
        });

        setDisplayMarker(0);
    }

    return (
        <div className="map-area flex-c-c flex-dir-column" ref={mapRef}>
            {/* <h1><b>MAP STUFF HERE</b></h1> */}

        </div>
    );
}