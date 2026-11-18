import { useEffect, useRef, useState } from 'react';
import { supabase } from '../services/supabaseClient'
import { LeafletMap, TileLayer, Marker } from 'leaflet';
import 'leaflet/styles.css';

function Map() {
    const [buttonText, setButtonText] = useState("EDIT : OFF");
    const editMode = useRef(false);
    const uid = useRef()
    const points = useRef([])
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


    // Save the current user uid in uid
    useEffect(() => {
        async function getUser() {
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                console.error("Erreur Supabase :", error)
            } else {
                //console.log("User reçue :", data)
                console.log(data.user.id)
                uid.current = data.user.id
            }
        }
        getUser()
    }, [])

    useEffect(() => {
        let cancelled = false;
        const map = new LeafletMap('map').setView([46.15313, -1.14584], 15);

        new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);


        const marker = new Marker([46.15313, -1.14584]).addTo(map);

        async function getPoints() {
            const { data, error } = await supabase.from('points').select('*')
            if (error) {
                console.error("Erreur Supabase :", error)
            } else {
                if (cancelled) return;
                console.log("Points reçue :", data)
                data.forEach(element => {
                    console.log(element);
                    const marker = new Marker([element.lat, element.lng]).addTo(map);
                });
            }
        }
        getPoints()

        async function onMapClick(e) {
            if (editMode.current){
                new Marker(e.latlng).addTo(map);
                const { data, error } = await supabase.from('points').insert([
                {
                    user_id: uid.current,
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                },
                ])
            }
        }

        map.on('click', onMapClick);

        return () => {
            cancelled = true;
            map.remove();
        };
    }, [])
    

    return (
        <>
            <button onClick={editMap}>{buttonText}</button>
            <div id="map" style={{ height: 400 }}></div>
            <h1>{uid.current}</h1>
            {/* <Map /> */}
        </>
    )
}

export default Map
