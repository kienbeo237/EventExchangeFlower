import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [editOrder, setEditOrder] = useState(null); // State to handle the order being edited
  const [updatedShippingAddress, setUpdatedShippingAddress] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState('');
  
  const user = JSON.parse(localStorage.getItem('user')); // Fetching the logged-in user's info

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/identity/orders/user/${user.userID}`);
        setOrders(response.data);
        console.log(response.data.result)
      } catch (error) {
        console.error('Lỗi khi tải lịch sử đơn hàng:', error);
      }
    };

    fetchOrderHistory();
  }, [user.userID]);

  // Function to handle editing an order
  const handleEditOrder = (order) => {
    setEditOrder(order);
    setUpdatedShippingAddress(order.shippingAddress);
    setUpdatedStatus(order.status);
  };

  // Function to handle submitting the updated order
  const handleUpdateOrder = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/identity/orders/${editOrder.orderID}`, {
        shippingAddress: updatedShippingAddress,
        status: updatedStatus
      });
      alert('Cập nhật đơn hàng thành công!');
      setEditOrder(null); // Reset edit state
      window.location.reload(); // Reload the order history to show the updated data
    } catch (error) {
      console.error('Lỗi khi cập nhật đơn hàng:', error);
      alert('Có lỗi xảy ra khi cập nhật đơn hàng.');
    }
  };

  return (
    <div className="order-history">
      <h2>Lịch Sử Đơn Hàng</h2>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order.orderID} className="order-item">
            {editOrder?.orderID === order.orderID ? (
              <div className="edit-order">
                <h3>Chỉnh sửa đơn hàng #{order.orderID}</h3>
                <label>
                  Địa chỉ giao hàng:
                  <input 
                    type="text" 
                    value={updatedShippingAddress} 
                    onChange={(e) => setUpdatedShippingAddress(e.target.value)} 
                  />
                </label>
                <label>
                  Trạng thái:
                  <select value={updatedStatus} onChange={(e) => setUpdatedStatus(e.target.value)}>
                    <option value="Chưa Thanh Toán">Chưa Thanh Toán</option>
                    <option value="Đã Thanh Toán">Đã Thanh Toán</option>
                    <option value="Đang Giao Hàng">Đang Giao Hàng</option>
                    <option value="Đã Giao">Đã Giao</option>
                  </select>
                </label>
                <button onClick={handleUpdateOrder}>Cập nhật</button>
                <button onClick={() => setEditOrder(null)}>Hủy</button>
              </div>
            ) : (
              <div>
                <h3>Đơn hàng #{order.orderID}</h3>
                <p>Ngày đặt: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Tổng cộng: {order.totalPrice}₫</p>
                <p>Phương thức thanh toán: {order.paymentMethod === 1 ? 'VNPay' : 'COD'}</p>
                <p>Địa chỉ giao hàng: {order.shippingAddress}</p>
                <p>Trạng thái: {order.status}</p>
                <p>Người dùng: {order.user.username} - {order.user.email}</p> {/* Displaying user details */}
                {/* <div className="order-details">
                  {order.items.map(item => (
                    <div key={item.flowerID} className="order-item-details">
                      <span>{item.flowerName}</span>
                      <span>{item.quantity} x {item.price}₫</span>
                    </div>
                  ))}
                </div> */}
                <button onClick={() => handleEditOrder(order)}>Chỉnh sửa</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Không có đơn hàng nào</p>
      )}
    </div>
  );
};

export default OrderHistory;
