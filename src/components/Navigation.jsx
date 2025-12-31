import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navigation.css'

function Navigation() {
  const { username, isLoggedIn, logout } = useAuth()

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
        <div className="nav-user-section">
          <div className="nav-user">
            {isLoggedIn ? username : 'Anonymous'}
          </div>
          {isLoggedIn ? (
            <button onClick={logout} className="auth-button logout">
              Logout
            </button>
          ) : (
            <Link to="/login" className="auth-button login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
