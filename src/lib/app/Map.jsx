import { useEffect, useRef } from 'react';
import { LeafletMap, TileLayer, Marker } from 'leaflet';
import 'leaflet/styles.css';

function Map() {
    useEffect(() => {
        const map = new LeafletMap('map').setView([46.15313, -1.14584], 15);

        new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);


        const marker = new Marker([46.15313, -1.14584]).addTo(map);

        function onMapClick(e) {
            new Marker(e.latlng).addTo(map);
        }

        map.on('click', onMapClick);

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
