import './index.css'
import Cookies from 'js-cookie'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

function Header() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/login', { replace: true })
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="header-container">
      <div className="header-left-pop-res">
        <Link to="/" className="logo-container">
          <img
            src="https://res.cloudinary.com/dodfv5sbg/image/upload/v1752822327/Frame_274_ptqsm2.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="site-name">Tasty Kitchens</h1>
        </Link>
      </div>

      {/* Hamburger Icon - Only visible on small screens */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Desktop / Mobile Menu */}
      <ul className={`header-right ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            end
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </NavLink>
        </li>
        <li>
          <button
            className="logout-btn"
            onClick={() => {
              setMenuOpen(false)
              handleLogout()
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Header
