import React from "react";
import NavBar from "../components/NavBar";
import InventoryCard from "../components/InventoryCard";

function InventoryPage() {
    return (
        <div className="pageLayout">
            <div className="pageLayoutBody">

                <h1>Liste des stickers</h1>
                <div className="spaceHeightL"></div>
                <p> Stickers actuellement disponible à la production. Cette liste est mise à jour par les Lesbiennes du 409. </p>
                <div className="spaceHeightL"></div>
                <div className="gridView">
                    <InventoryCard />
                </div>

            </div>
            <NavBar />
        </div>
    );
}

export default InventoryPage;