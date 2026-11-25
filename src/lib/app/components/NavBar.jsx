import { BrowserRouter as Link } from 'react-router-dom';
import { Pin } from './../../services/iconService.jsx';

function NavBar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">
                        <div className="menuIcon">
                            <Pin border={'#000000'} hatching={'#C0392B'}></Pin>
                            Carte
                        </div>
                    </Link>
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

    );
}

export default NavBar