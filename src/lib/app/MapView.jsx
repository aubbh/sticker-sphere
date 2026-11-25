import { useEffect, useRef, useState } from 'react';
import { supabase } from '../services/supabaseClient'
import { LeafletMap, TileLayer, Marker, LayerGroup, Icon, Circle } from 'leaflet';
import CreatePoint from './CreatePoint.jsx'
import 'leaflet/styles.css';
import pinUrl from '../../assets/icons/pin.svg';
import newPinUrl from '../../assets/icons/newPin.svg';
import profileUrl from '../../assets/icons/profile.svg';

function MapView() {
    const [buttonText, setButtonText] = useState("EDIT : OFF");
    const editMode = useRef(false);
    const uid = useRef()
    const points = useRef(null)
    const tempNewPoint = useRef(null)
    const map = useRef()
    const [position, setPosition] = useState(null)

    var classicIcon = new Icon({
        iconUrl: pinUrl,
        iconSize: [38, 50],
        iconAnchor: [19, 50],
    })

    var newIcon = new Icon({
        iconUrl: newPinUrl,
        iconSize: [38, 50],
        iconAnchor: [19, 50],
    })

    var profileIcon = new Icon({
        iconUrl: profileUrl,
        iconSize: [38, 50],
        iconAnchor: [19, 40],
    })

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

    // get all the point from the db and display them on the map
    async function getPoints() {
        const { data, error } = await supabase.from('points').select('*')
        if (error) {
            console.error("Erreur Supabase :", error)
        } else {
            console.log("Points reçue :", data)
            if (!points.current) return;
            points.current.clearLayers()
            data.forEach(element => {
                console.log(element);
                new Marker([element.lat, element.lng], {icon: classicIcon}).addTo(points.current);
            });
        }
    }

    // Initialise the map and listen for a click
    useEffect(() => {
        map.current = new LeafletMap('map').setView([46.15313, -1.14584], 15);

        new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map.current);
        function onMapClick(e) {
            if (editMode.current){
                setPosition(e.latlng)

                //Display a temp point while creating a point
                tempNewPoint.current.clearLayers()
                new Marker([e.latlng.lat, e.latlng.lng], {icon: newIcon}).addTo(tempNewPoint.current);

                //focus on the point
                map.current.setView(e.latlng)
            }
            else{
                console.log("CREATION IMPOSSIBLE")
            }
        }

        tempNewPoint.current = new LayerGroup().addTo(map.current);
        points.current = new LayerGroup().addTo(map.current);
        getPoints()


        map.current.on('click', onMapClick);

        //draw a marker on your position
        function onLocationFound(e) {
            const radius = e.accuracy;

            new Marker(e.latlng, {icon: profileIcon}).addTo(map.current);
                // .bindPopup("You are within " + radius + " meters from this point").openPopup();

            new Circle(e.latlng, {radius}).addTo(map.current);
        }

        map.current.on('locationfound', onLocationFound);
        map.current.locate({setView: true, maxZoom: 16});
        

        return () => {
            map.current.remove();
        };
    }, [])


    // Once a point is created we need to be able to display it
    function handleCreated() {
        tempNewPoint.current.clearLayers()
        getPoints()
        setPosition(null)
    }

    // the creation modal is leaved without creating a point
    function handleClose() {
        setPosition(null)
        tempNewPoint.current.clearLayers()
    }


    return (
        <>
            <div style={{ position: 'relative' }}>
                <div id="map" style={{ height: 'calc(100vh - 50px)' }}></div>
                <button
                    onClick={editMap}
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        zIndex: 1000,
                        width: 'auto',
                        height: 'auto',
                    }}
                >
                    {buttonText}
                </button>
            </div>
            {/* display a popUp if a position is recorded */}
            {position && ( 
                <CreatePoint 
                    position={position} 
                    onCreated={handleCreated} 
                    uid={uid.current} 
                    onClose={handleClose}
                />
            )}
        </>
    )
}

export default MapView
