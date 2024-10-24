import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
import Footer from '../components/Footer';
import '../styles/popup.css';

const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleQuantityChange = async (id, delta) => {
    const updatedItems = cartItems.map((item) =>
      item.flowerID === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const handleDelete = (id) => {
    const updatedItems = cartItems.filter((item) => item.flowerID !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePurchase = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setPopupMessage("Bạn cần đăng nhập để tiếp tục!");
      setShowPopup(true);
    } else if (cartItems.length === 0) {
      setSuccessMessage("Giỏ hàng trống, vui lòng thêm sản phẩm !");
    } else {
      navigate('/checkout', { state: { cartItems, totalPrice } });
      setCartItems([]);
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Giỏ Hàng</h2>
      </div>

      <div className="cart-table">
        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn trống</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Tổng cộng</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.flowerID}>
                  <td>{item.flowerName}</td>
                  <td>
                    <img src={item.imageUrl || 'default-image-url'} alt="Product" className="cart-image" />
                  </td>
                  <td>{item.price} VNĐ</td>
                  <td>
                    <button onClick={() => handleQuantityChange(item.flowerID, -1)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => handleQuantityChange(item.flowerID, 1)}>+</button>
                  </td>
                  <td>{item.price * item.quantity} VNĐ</td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(item.flowerID)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="cart-footer">
        <p className='cart-title'>
          Tổng thanh toán ({cartItems.length} Sản phẩm): {totalPrice}₫
        </p>
        <button onClick={handlePurchase}>Mua Hàng</button>
        {successMessage && <p className="cart-message">{successMessage}</p>}
      </div>

      <Footer />

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-icon">❌</div>
            <h2>Thông báo</h2>
            <p className="popup-message">{popupMessage}</p>
            <button
              className="close-button-popup"
              onClick={() => {
                setShowPopup(false);
                navigate("/login");
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
