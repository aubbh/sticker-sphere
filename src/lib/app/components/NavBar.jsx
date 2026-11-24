import { Pin } from '../../services/iconService.jsx'

function NavBar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <a href="#" title="Carte">
                        <div className="menuIcon">
                            <Pin border={'#000000'} hatching={'#C0392B'}></Pin>
                            Carte
                        </div>
                    </a>
                </li>
                <li>
                    <div className="menuIcon">
                        <Pin border={'#000000'} hatching={'#ffffff'}></Pin>
                        Inventaire
                    </div>
                </li>
                <li>
                    <div className="menuIcon">
                        <Pin border={'#000000'} hatching={'#ffffff'}></Pin>
                        Classement
                    </div>
                </li>
                <li>
                    <div className="menuIcon">
                        <Pin border={'#000000'} hatching={'#ffffff'}></Pin>
                        Profil
                    </div>
                </li>
            </ul>
        </nav >
    )
}

export default NavBar