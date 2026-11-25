import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import InventoryCard from "../components/InventoryCard";
import { supabase } from "../../services/supabaseClient";

function InventoryPage() {
    const [stickers, setStickers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStickers() {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                console.warn("Personne de connecté");
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("sticker")
                .select(`
                    id,
                    name,
                    variant (
                        id,
                        image_url,
                        style ( label ),
                        size ( label ),
                        lamination ( label )
                    )
                `);

            if (error) {
                console.error("Erreur Supabase (chargement des stickers) :", error);
            } else {
                setStickers(data);
            }
            setLoading(false);
        }

        fetchStickers();
    }, []);

    return (
        <div className="pageLayout">
            <div className="pageLayoutBody">
                <h1>Liste des stickers</h1>
                <div className="spaceHeightL"></div>
                <p> Stickers actuellement disponible à la production. Cette liste est mise à jour par les Lesbiennes du 409. </p>
                <div className="spaceHeightL"></div>

                {loading ? (
                    <p>Chargement des stickers...</p>
                ) : (
                    <div className="gridView">
                        {stickers.map((sticker) => (
                            <InventoryCard key={sticker.id} sticker={sticker} />
                        ))}
                    </div>
                )}
            </div>
            <NavBar />
        </div>
    );
}

export default InventoryPage;