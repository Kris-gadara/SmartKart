import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CustomerDashboard.css'; 

function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/api/products', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data); 
        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          throw new Error('Unexpected data format from backend');
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        if (err.message.includes('401')) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]); 

  useEffect(() => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToCart = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop';
  };

  const getImageUrl = (product) => {
    // If the image is a full URL (external), use it directly
    if (product.image && product.image.startsWith('http')) {
      return product.image;
    }
    // If it's a local path, construct the full URL
    return `http://localhost:5000${product.image}`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Discover Amazing Electronics</h2>
        <p>Find the latest gadgets and cutting-edge technology</p>
      </div>
      
      <div className="search-container">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search terms or browse all products</p>
            <button 
              onClick={() => setSearchQuery('')} 
              className="clear-search-btn"
            >
              Clear Search
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image-container">
                <img
                  src={getImageUrl(product)}
                  alt={product.name}
                  className="product-image"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="product-overlay">
                  <button
                    className="add-to-cart-btn-overlay"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <p className="product-price">₹{product.price.toLocaleString()}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CustomerDashboard; 