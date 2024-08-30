import "../ComponentCSS/MapArea.css";

import { useRef, useEffect } from "react";
import H from "@here/maps-api-for-javascript";

export const Map = ({ apiKey }) => {

    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null);

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

            // Create a new map instance with the Tile layer, center and zoom level
            // Instantiate (and display) a map:
            const newMap = new H.Map(
                mapRef.current,
                defaultLayers.vector.normal.map, {
                    zoom: 14,
                    center: {
                        lat: 64.144,
                        lng: -21.94,
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
    }, [apiKey]);

    return (
        <div className="map-area flex-c-c flex-dir-column" ref={mapRef}>
            {/* <h1><b>MAP STUFF HERE</b></h1> */}

        </div>
    );
}