import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Footer from './components/Footer';
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop"; 

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import ProfilePage from './pages/ProfilePage';
import Cart from './pages/Cart';
import AdminUserManagement from './pages/AdminUserManagement';
import FlowerBatchDetail from "./pages/FlowerBatchDetail";
import BlogPage from "./pages/Blog";
import Payment from "./pages/Payment";
import Checkout from './pages/Checkout';
import SuccessPage from './pages/SuccessPage';

function App() {
  // State quản lý giỏ hàng toàn cục
  const [cartItems, setCartItems] = useState([]);

  // Lấy dữ liệu giỏ hàng từ localStorage khi ứng dụng khởi động
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  // Cập nhật localStorage khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        {/* Navbar sẽ luôn hiển thị */}
        <Navbar cartCount={cartItems.length} /> 
        
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/flower/:id" element={<FlowerBatchDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} /> {/* Truyền props cho giỏ hàng */}
          <Route path="/admin-user-management" element={<AdminUserManagement />} />
          <Route path="/blog-page" element={<BlogPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />

          <Route path="/success-page" element={<SuccessPage />} />
        </Routes>

        {/* Footer hiển thị dưới cùng */}
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
