import { supabase } from "../../services/supabaseClient";

function InventoryCard({ sticker }) {
    const variants = sticker.variant || [];

    // Default image: original style otherwise first to exist
    const defaultVariant =
        variants.find((v) => v.style?.label === "Original") || variants[0];

    const imageUrl = defaultVariant?.image_url
        ? supabase.storage
            .from("stickers")
            .getPublicUrl(defaultVariant.image_url).data.publicUrl
        : "";

    // Details list without same occurrences 
    const styles = [...new Set(variants.map((v) => v.style?.label).filter(Boolean))];
    const sizes = [...new Set(variants.flatMap((v) => v.size?.map((s) => s.label) || [])),];
    const laminations = [...new Set(
        variants.flatMap((v) => v.lamination?.map((l) => l.label) || [])
    )];

    return (
        <div className="inventoryCard">
            <div className="inventoryImg">
                {imageUrl && (
                    <img src={imageUrl} alt={sticker.name || "Sticker"} />
                )}
            </div>
            <div className="spaceHeightM"></div>
            <h2>{sticker.name}</h2>
            <div className="spaceHeightS"></div>
            <p>Styles : {styles.join(", ")}</p>
            <p>Tailles : {sizes.join(", ")}</p>
            <p>Lamination : {laminations.join(", ")}</p>
        </div>
    );
}

export default InventoryCard;