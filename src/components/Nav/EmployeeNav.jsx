import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './NavBar.css'

export const EmployeeNav = () => {
  const navigate = useNavigate()

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/orders">
          Order List
        </Link>
      </li>
      {localStorage.getItem('pizza_user') ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem('pizza_user')
              navigate('/', { replace: true })
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ''
      )}
    </ul>
  )
}
