import { Pin } from '../services/iconService.jsx'
function NavBar() {
    return(
        <nav className="navbar">
            <Pin border={'#000000'} hatching={'#ffffff'} size={40}></Pin>
            <Pin border={'#000000'} hatching={'#ff0000'} size={40}></Pin>
            <p>3</p>
            <p>4</p>   
        </nav>
    )
}

export default NavBar