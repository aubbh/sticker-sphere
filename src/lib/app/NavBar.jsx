import { Icons } from '../services/iconService.jsx'
function NavBar() {
    return(
        <nav className="navbar">
            <Icons type='pin' border={'#000000'} hatching={'#ff0000'} size={40}></Icons>
            <Icons type='sticker' border={'#000000'} hatching={'#ff0000'} size={40}></Icons>
            <Icons type='profile' border={'#000000'} hatching={'#ff0000'} size={40}></Icons>
        </nav>
    )
}

export default NavBar