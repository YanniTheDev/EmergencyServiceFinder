import "../ComponentCSS/MapArea.css";

import { useRef } from "react";

export const Map = (props) => {

    // // Initiate and authenticate your connection to the HERE platform:
    // const platform = new H.service.Platform({
    //     "apiKey": props.apiKey
    // })

    // // Initialize the engine type:
    // const engineType = H.Map.EngineType["Harp"];

    // // Obtain the default map types from the platform object:
    // const defaultLayers = platform.createDefaultLayers({
    //     engineType: engineType
    // });

    // const mapRef = useRef();

    // // Instantiate (and display) a map:
    // const map = new H.Map(
    //     mapRef.current,
    //     defaultLayers.hybrid.day.raster,
    //     {
    //         engineType: engineType,
    //         zoom: 14,
    //         pixelRatio: 2,
    //         center: {
    //             lat: 45.5048,
    //             lng: -73.5870
    //         }
    //     }
    // )

    // map.addLayer(defaultLayers.hybrid.day.vector);

    // // MapEvents enables the event system.
    // // The behavior variable implements default interactions for pan/zoom (also on mobile touch environments).
    // const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // // Enable dynamic resizing of the map, based on the current size of the enclosing cntainer
    // window.addEventListener('resize', () => map.getViewPort().resize());

    // // Create the default UI:
    // const ui = H.ui.UI.createDefault(map, defaultLayers)

    return (
        <div className="map-area flex-c-c flex-dir-column">
            {/* <h1><b>MAP STUFF HERE</b></h1> */}

        </div>
    );
}