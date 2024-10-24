import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Logo from '../assets/Flower_preview_rev_1.png';
import { FaUser, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

function Navbar({ cartCount }) { // Nhận cartCount từ App.js qua props
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]); 
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Fetch posts from the backend/API
  useEffect(() => {
    axios.get('http://localhost:8080/identity/posts/')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value) {
      const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(value) ||
        post.content?.toLowerCase().includes(value) // Safeguard against undefined content
      );
      setSearchResults(filteredPosts);
    } else {
      setSearchResults([]);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    setUser(null);
    // window.location.reload();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="Logo" className="navbar-logo" />
      </div>

      <div className="navbar-center">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Trang chủ</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Giới thiệu</NavLink>
        <NavLink to="/menu" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Bài viết</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Feedback</NavLink>
        <NavLink to="/blog-page" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Blog</NavLink>
      </div>

      <div className="navbar-right">
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="search-bar-nav"
            placeholder="Tìm kiếm bài viết..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((post) => (
                <Link to={'/menu'} key={post.id} className="search-result-item">
                  <h4>{post.title}</h4>
                  <p>{post.content ? post.content.substring(0, 100) : 'No content available'}...</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {user ? (
          <>
            <span className="navbar-user">Xin chào , {user.username || 'User'}</span>
            <Link to={user?.roles?.includes('ADMIN') ? '/admin-user-management' : '/profile-page'}>
              <FaUser className="navbar-icon" />
            </Link>
            <FaSignOutAlt className="navbar-icon" onClick={handleLogout} />
          </>
        ) : (
          <Link to="/login">
            <FaUser className="navbar-icon" />
          </Link>
        )}

        <div className="cart-icon-wrapper">
          <Link to="/cart">
            <FaShoppingBag className="navbar-icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
