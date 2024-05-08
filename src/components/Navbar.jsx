import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
        <span>Header</span>
        <ul>
            <li><Link to="/" className='no_decoration'>Login</Link></li>
            <li><Link to="/profile" className='no_decoration'>Profile</Link></li>
        </ul>
    </div>
  )
}

export default Navbar