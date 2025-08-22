import './index.css'
import Cookies from 'js-cookie'
import { NavLink, Link } from 'react-router-dom'

function Header() {
  const handleLogout = () => {
    Cookies.remove('token')
    window.location.href = '/login'
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

      {/* Menu buttons */}
      <ul className="header-right">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
            end
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
          >
            Cart
          </NavLink>
        </li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Header
