const apiKey = import.meta.env.VITE_HERE_API_KEY;

// Initiate and authenticate your connection to the HERE platform:
const platform = new H.service.Platform({
    "apiKey": apiKey
})

// Initialize the engine type:
const engineType = H.Map.EngineType["Harp"];

// Obtain the default map types from the platform object:
const defaultLayers = platform.createDefaultLayers({
    engineType: engineType
});

// Instantiate (and display) a map:
const map = new H.Map(
    document.getElementById("map-area"),
    defaultLayers.hybrid, {
        engineType: engineType,
        zoom: 14,
        pixelRatio: 2,
        center: {
                lat: 45.5048,
                lng: -73.5870
            }
    });

map.addLayer(defaultLayers.hybrid.day.vector);

// MapEvents enables the event system.
// The behavior variable implements default interactions for pan/zoom (also on mobile touch environments).
const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Enable dynamic resizing of the map, based on the current size of the enclosing cntainer
window.addEventListener('resize', () => map.getViewPort().resize());

// Create the default UI:
const ui = H.ui.UI.createDefault(map, defaultLayers)

// Create an info bubble with the HTML content
const coords = { lat: 45.5048, lng: -73.5870 };
const infoBubble = new H.ui.InfoBubble(coords, {
    content: '<b>Mount Royal</b><br>A hill in Montreal with stunning city views'
});

ui.addBubble(infoBubble);