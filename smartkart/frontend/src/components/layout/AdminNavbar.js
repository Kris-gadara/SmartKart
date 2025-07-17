import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <nav className="admin-navbar shadow-md backdrop-blur-lg bg-gray-900/90 text-white sticky top-0 z-50">
      <div className="admin-navbar-container">
        
        {/* Logo / Brand */}
        <Link to="/admin/dashboard" className="admin-logo">
          SmartKart Admin
        </Link>

        {/* Navigation Links */}
        <div className="admin-nav-links">
          <Link to="/admin/dashboard" className="admin-nav-link">
            Dashboard
          </Link>
          <Link to="/admin/products/add" className="admin-nav-link">
            Add Product
          </Link>
          <Link to="/admin/products" className="admin-nav-link">
            Manage Products
          </Link>
        </div>

        {/* Logout Button */}
        <div className="admin-nav-icons">
          <button
            onClick={handleLogout}
            className="admin-icon-link logout-button"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
