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

        {/* Profile SVG */}
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? 'profile-icon-link profile-active' : 'profile-icon-link'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="profile-icon"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
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
