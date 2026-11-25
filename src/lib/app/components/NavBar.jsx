import { Link } from 'react-router-dom';
import { Icons } from './../../services/iconService.jsx';

function NavBar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">
                        <div className="menuIcon">
                            <Icons type='pin' border={'#000000'} hatching={'#C0392B'}></Icons>
                            Carte
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to="/inventory">
                        <div className="menuIcon">
                            <Icons type='sticker' border={'#000000'} hatching={'#C0392B'}></Icons>
                            Inventaire
                        </div>
                    </Link>
                </li>
                <li>
                    <div className="menuIcon">
                        <Icons type='pin' border={'#000000'} hatching={'#C0392B'}></Icons>
                        Classement
                    </div>
                </li>
                <li>
                    <div className="menuIcon">
                        <Icons type='profile' border={'#000000'} hatching={'#C0392B'}></Icons>
                        Profil
                    </div>
                </li>
            </ul>
        </nav >

    );
}

export default NavBar

