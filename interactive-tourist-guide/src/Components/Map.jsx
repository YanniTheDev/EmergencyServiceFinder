import "../ComponentCSS/MapArea.css";

import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import H from "@here/maps-api-for-javascript";

export const Map = forwardRef(({ apiKey, userCoord }, ref) => {

    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null);

    let newMap = null;

    useEffect(() => {
        if (!map.current) {

            // Create a platform object with the API key and useCIT option
            platform.current = new H.service.Platform({
                apiKey
            });

            // Obtain the default map types from the platform object:
            const defaultLayers = platform.current.createDefaultLayers({
                pois: true
            });

            // Create a new map instance with the Tile layer, center and zoom level
            // Instantiate (and display) a map:
            newMap = new H.Map(
                mapRef.current,
                defaultLayers.vector.normal.map, {
                    zoom: 3.5,
                    center: {
                        // ...zoomCenter,
                        ...userCoord,
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
        
    }, [apiKey, userCoord]);

    //Exposes the displayMap function to the parent component
    useImperativeHandle(ref, () => {
        return {
            addRestaurantMarkers: addRestaurantMarkers, 
        }
    });

    const addRestaurantMarkers = (inDistanceRestaurants) => {

        map.current.removeObjects(map.current.getObjects());
        
        inDistanceRestaurants.forEach(element => {
            
            let restaurantMarker = new H.map.Marker({lat: element.position.lat, lng: element.position.lng});
            try {
                map.current.addObject(restaurantMarker);
            } catch (error) {
                console.log(error)
            }
        });

    }

    return (
        <div className="map-area flex-c-c flex-dir-column" ref={mapRef}>
            {/* <h1><b>MAP STUFF HERE</b></h1> */}

        </div>
    );
});