import { supabase } from '../services/supabaseClient'

function CreatePoint({position, uid, onCreated, onClose}) {
    async function createPoint(e) {
        e.preventDefault()
        const image = new FormData(e.target).get('image')

        const { data, error } = await supabase.from('points').insert([
        {
            user_id: uid,
            lat: position.lat,
            lng: position.lng,
            image: image
        },
        ])

        onCreated()
    }
    return(
        <>
            <h1>
                {position.lat.toFixed(5)}, {position.lng.toFixed(5)}
            </h1>
            <dialog id="modal" open>
                <p>Test Modal</p>
                <form onSubmit={createPoint}>
                    <label>
                        <input name="image" />
                    </label>
                    <button type="submit">Create</button>
                </form>
                <button onClick={onClose}>Close</button>
            </dialog>
        </>
    )
}

export default CreatePoint