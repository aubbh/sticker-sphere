import { useEffect, useRef, useState } from 'react';
import { supabase } from '../services/supabaseClient'
import { LeafletMap, TileLayer, Marker } from 'leaflet';
import CreatePoint from './CreatePoint.jsx'
import 'leaflet/styles.css';

function MapView() {
    const [buttonText, setButtonText] = useState("EDIT : OFF");
    const editMode = useRef(false);
    const uid = useRef()
    //const points = useState([])
    const map = useRef()
    const [position, setPosition] = useState(null)
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

    // function openModal() {
    //     modal?.showModal();
    // }
    
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
        
        map.current = new LeafletMap('map').setView([46.15313, -1.14584], 15);

        new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map.current);

        //const marker = new Marker([46.15313, -1.14584]).addTo(map);
        async function onMapClick(e) {
            if (editMode.current){
                setPosition(e.latlng)
                //new Marker(e.latlng).addTo(map.current);
                
                // const { data, error } = await supabase.from('points').insert([
                // {
                //     user_id: uid.current,
                //     lat: e.latlng.lat,
                //     lng: e.latlng.lng,
                // },
                // ])
            }
        }

        map.current.on('click', onMapClick);

        return () => {
            map.current.remove();
        };
    }, [])

    // get all the point from the db and display them on the map
    useEffect(() => {
        let cancelled = false;
        async function getPoints() {
            const { data, error } = await supabase.from('points').select('*')
            if (error) {
                console.error("Erreur Supabase :", error)
            } else {
                if (cancelled) return;
                console.log("Points reçue :", data)
                data.forEach(element => {
                    console.log(element);
                    const marker = new Marker([element.lat, element.lng]).addTo(map.current);
                });
            }
        }
        return () => {
            cancelled = true;
        };
        getPoints()
    }, [])
    
    


    return (
        <>
            <button onClick={editMap}>{buttonText}</button>
            <div id="map" style={{ height: 400 }}></div>
            {/* display a popUp if a position is recorded */}
            {position && (
                <h1>
                    {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
                </h1>
            )}

            
        </>
    )
}

export default MapView
