import { useEffect, useRef } from 'react';
import { LeafletMap, TileLayer } from 'leaflet';
import 'leaflet/styles.css';

function Map() {
    useEffect(() => {
        const map = new LeafletMap('map').setView([51.505, -0.159], 15);

        new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);


        return () => {
            map.remove();
        };

    }, [])

    return (
        <>
            <div id="map" style={{ height: 400 }}></div>
            {/* <Map /> */}
        </>
    )
}

export default Map
