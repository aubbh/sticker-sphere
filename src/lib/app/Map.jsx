import { useEffect, useRef, useState } from 'react';
import { supabase } from '../services/supabaseClient'
import { LeafletMap, TileLayer, Marker } from 'leaflet';
import 'leaflet/styles.css';

function Map() {
    const [buttonText, setButtonText] = useState("EDIT : OFF");
    const editMode = useRef(false);
    const uidRef = useRef()
    function editMap() {
        if (editMode.current){
            editMode.current = false;
            setButtonText("EDIT : OFF");
        }
        else {
            editMode.current = true;
            setButtonText("EDIT : ON");
        }
    }

    useEffect(() => {
        async function getUser() {
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                console.error("Erreur Supabase :", error)
            } else {
                //console.log("User reçue :", data)
                console.log(data.user.id)
                uidRef.current = data.user.id
            }
        }
        getUser()
    }, [])

    useEffect(() => {
        const map = new LeafletMap('map').setView([46.15313, -1.14584], 15);

        new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);


        const marker = new Marker([46.15313, -1.14584]).addTo(map);

        async function onMapClick(e) {
            if (editMode.current){
                new Marker(e.latlng).addTo(map);
                const { data, error } = await supabase.from('points').insert([
                {
                    user_id: uidRef.current,
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                },
                ])
            }
            
        }

        map.on('click', onMapClick);

        return () => {
            map.remove();
        };

    }, [])
    

    return (
        <>
            <button onClick={editMap}>{buttonText}</button>
            <div id="map" style={{ height: 400 }}></div>
            <h1>{uidRef.current}</h1>
            {/* <Map /> */}
        </>
    )
}

export default Map
