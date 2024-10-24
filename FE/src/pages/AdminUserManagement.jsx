import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaShoppingCart } from 'react-icons/fa'; // Import các icon từ react-icons
import '../styles/AdminUserManagement.css';
import '../styles/popup.css';
const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(0);
  const [posts, setPosts] = useState([]); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPopup, setShowPopup] = useState(false); // Điều khiển hiển thị pop-up
  const [popupMessage, setPopupMessage] = useState(''); // Thông điệp hiển thị trong pop-up
  const [orders, setOrders] = useState([]);

  // const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  
   //hiện thông tin khách hàng và bài post
  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchOrders();
  }, []);
  


 

//Hiển thị người dùng
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/identity/users');
      console.log(response)
      const usersData = response.data.result;
      setUsers(usersData);
      setTotalUsers(usersData.length);
      setActiveUsers(usersData.filter((user) => !user.isBlocked).length);
      setBlockedUsers(usersData.filter((user) => user.isBlocked).length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };
//Hiển thị post
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/identity/posts/');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/identity/orders/');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
//Xóa post
  const handleDeletePost = async (postID) => {
    try {
      await axios.delete(`http://localhost:8080/identity/posts/${postID}`);
      fetchPosts();
      // setPopupMessage("Bài viết đã xóa thành công");
      // setShowPopup(true); 
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleBlockUser = async (userID, isBlocked) => {
    try {
      const action = isBlocked ? 'unblock' : 'block';
      await axios.post(`http://localhost:8080/admin/users/${action}/${userID}`);
      fetchUsers();
    } catch (error) {
      console.error(`Error ${isBlocked ? 'unblocking' : 'blocking'} user:`, error);
    }
  };

  const handleDeleteUser = async (userID) => {
    try {
      await axios.delete(`http://localhost:8080/identity/users/${userID}`);
      fetchUsers();
      setPopupMessage("Đã xóa tài khoản khách hàng thành công !");
      setShowPopup(true); // Hiển thị pop-up
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

// Handle delete order
const handleDeleteOrder = async (orderID) => {
  try {
    await axios.delete(`http://localhost:8080/identity/orders/${orderID}`);
    fetchOrders();
    setPopupMessage("Đơn hàng đã xóa thành công");
    setShowPopup(true);
  } catch (error) {
    console.error('Error deleting order:', error);
  }
};



  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2 className='admin-title'>Tổng quan</h2>
            <div className="dashboard">
              <div className="stat">
                <h3>Tổng số người dùng</h3>
                <p>{totalUsers}</p>
              </div>
              <div className="stat">
                <h3>Người dùng hoạt động</h3>
                <p>{activeUsers}</p>
              </div>
              <div className="stat">
                <h3>Người dùng bị khóa</h3>
                <p>{blockedUsers}</p>
              </div>
            </div>
          </div>
        );
      case 'userList':
        return (
          <div>
            <h2 className='admin-title'>Danh sách người dùng</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {filteredUsers.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.userID}>
                      <td>{user.userID}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.isBlocked ? 'Bị khóa' : 'Hoạt động'}</td>
                      <td>
                        <button className='button-block' onClick={() => handleBlockUser(user.userID, user.isBlocked)}>
                          {user.isBlocked ? 'Bỏ khóa' : 'Khóa'}
                        </button>
                        <button className='button-delete' onClick={() => handleDeleteUser(user.userID)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không tìm thấy người dùng nào.</p>
            )}
          </div>
        );
      case 'post-setting':
        return (
          <div>
            <h2 className='admin-title'>Quản lý bài viết</h2>
            {posts.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tiêu đề</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.postID}>
                      <td>{post.postID}</td>
                      <td>{post.title}</td>
                      <td>{post.description}</td>
                      <td>{post.price}₫</td>
                      <td>
                        <button className='button-post-delete' onClick={() => handleDeletePost(post.postID)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không có bài viết nào.</p>
            )}
          </div>
        );

        case 'order-management':
        return (
          <div>
            <h2 className='admin-title'>Quản lý đơn hàng</h2>
            {orders.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Khách hàng</th>
                    <th>Ngày</th>
                    <th>Tổng (VNĐ)</th>
                    <th>Trạng thái</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderID}>
                      <td>{order.orderID}</td>
                      <td>{order.user.username}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>{order.totalPrice} VNĐ</td>
                      <td>{order.status}</td>
                      <td>
                        <button className='button-delete' onClick={() => handleDeleteOrder(order.orderID)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không có đơn hàng nào.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li onClick={() => setActiveTab('dashboard')}>
            <FaTachometerAlt className="icon" /> Dashboard Tổng quan
          </li>
          <li onClick={() => setActiveTab('userList')}>
            <FaUsers className="icon" /> Danh sách người dùng
          </li>
          <li onClick={() => setActiveTab('post-setting')}>
            <FaClipboardList className="icon" /> Quản lý Post
          </li>
          <li onClick={() => setActiveTab('order-management')}>
            <FaShoppingCart className="icon" /> Quản lý Đơn hàng
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-icon">✅</div>
            <h2>Thông báo</h2>
            <p className="popup-message">{popupMessage}</p>
            <button
              className="close-button-popup"
              onClick={() => {
                setShowPopup(false); // Close the popup
                // window.location.reload(); 
              }}>
              Đóng
            </button>
          </div>
        </div>
      )}



    </div>
  );
};

export default AdminUserManagement;
