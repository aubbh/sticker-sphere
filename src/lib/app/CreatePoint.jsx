//import getPoints from ./Map.jsx

function CreatePoint(position) {


    function closeModal() {
        modal?.close();
    }
    async function createPoint() {
        const { data, error } = await supabase.from('points').insert([
        {
            user_id: uid.current,
            lat: position.latlng.lat,
            lng: position.latlng.lng,
        },
        ])
        getPoints()
        //new Marker(e.latlng).addTo(map.current);
    }
    return(
        <>
            <dialog id="modal">
                <p>Test Modal</p>
                <input type="text">
                    {/* onChange={(event) => this.setState({enteredValue: event.target.value})}> */}
                </input>;
                <button onClick={closeModal}>Close</button>
                <button onClick={createPoint}>Create</button>
            </dialog>
        </>
    )
}

export default CreatePoint