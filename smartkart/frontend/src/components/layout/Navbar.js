import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Navbar({ pathname }) {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const isDashboard = pathname === '/dashboard' || pathname === '/profile';

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearCart();
    navigate('/customer/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Enhanced Brand Logo */}
          <Link 
            to="/" 
            className="group flex items-center space-x-2"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"></div>
              <div className="absolute inset-0 w-10 h-10 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-300">
              SmartKart
            </span>
          </Link>

          {/* Enhanced Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {!isDashboard && (
              <>
                <Link 
                  to="/" 
                  className="relative px-4 py-2 text-gray-700 font-medium rounded-lg hover:text-indigo-600 transition-all duration-300 group"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/dashboard" 
                  className="relative px-4 py-2 text-gray-700 font-medium rounded-lg hover:text-indigo-600 transition-all duration-300 group"
                >
                  <span className="relative z-10">Products</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/profile" 
                  className="relative px-4 py-2 text-gray-700 font-medium rounded-lg hover:text-indigo-600 transition-all duration-300 group"
                >
                  <span className="relative z-10">Orders</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </>
            )}
          </div>

          {/* Enhanced Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart with Enhanced Badge */}
            <Link 
              to="/cart" 
              className="relative group flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-all duration-300 rounded-lg hover:bg-gray-50"
              title="Go to Cart"
            >
              <div className="relative">
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M9 19a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartItems.length}
                  </div>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </Link>

            {/* Profile with Icon */}
            <Link 
              to="/profile" 
              className="group flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition-all duration-300 rounded-lg hover:bg-gray-50"
              title="Profile"
            >
              <div className="relative">
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="hidden sm:inline">Profile</span>
            </Link>

            {/* Enhanced Logout Button */}
            {isDashboard && (
              <button
                onClick={handleLogout}
                className="group relative px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-lg"
                title="Logout"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <div className="relative flex items-center gap-2">
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Toggle (for future mobile implementation) */}
      <div className="md:hidden absolute right-4 top-4">
        <button className="p-2 text-gray-700 hover:text-indigo-600 transition-colors duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;