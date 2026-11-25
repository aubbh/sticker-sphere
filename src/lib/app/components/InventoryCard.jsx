import { useState } from "react";
import { supabase } from "../../services/supabaseClient";


function InventoryCard() {

    const { data } = supabase
        .storage
        .from("stickers")
        .getPublicUrl("Lou_Antifasciste.PNG");

    const imageUrl = data.publicUrl;

    return (
        <div className="inventoryCard">
            <div className="inventoryImg">
                <img src={imageUrl} alt="Sticker Lou! Antifasciste" />
            </div>
        </div>
    );
}

export default InventoryCard;