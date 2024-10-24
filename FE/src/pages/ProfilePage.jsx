import React, { useState, useEffect } from "react";
import ProfileInfo from '../components/profilepagecomponent/ProfileInfo.jsx'; 
import CreatePost from "../components/profilepagecomponent/CreatePost.jsx";
import ChangeInfor from "../components/profilepagecomponent/ChangeInfor.jsx";
import ManagePosts from "../components/profilepagecomponent/ManagePosts.jsx";
import OrderHistory from "../components/profilepagecomponent/OrderHistory.jsx";  // Import the OrderHistory component
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);  // State to store userID

  useEffect(() => {
    // Fetch userID from localStorage or an API
    const fetchedUserID = localStorage.getItem('userID');
    setUserID(fetchedUserID);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo userID={userID}/>; 
      case 'change-infor':
        return <ChangeInfor userID={userID}/>; 
      case 'orders':
        return <OrderHistory userID={userID}/>;  // Add OrderHistory component
      case 'create-post':
        return <CreatePost/>;
      case 'manage-posts':
        return <ManagePosts userID={userID}/>;
      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <div className="profile-layout">
          <aside className="sidebar-profile-page">
            <h2 className="sidebar-profile-title">Cài Đặt Tài Khoản</h2>
            <ul className="sidebar-menu">
              <li className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}>
                <a href="#profile" onClick={() => setActiveTab('profile')}>Thông tin cá nhân</a>
              </li>
              <li className={`menu-item ${activeTab === 'change-infor' ? 'active' : ''}`}>
                <a href="#change-infor" onClick={() => setActiveTab('change-infor')}>Thay đổi thông tin</a>
              </li>
              <li className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}>
                <a href="#orders" onClick={() => setActiveTab('orders')}>Đơn hàng của tôi</a>
              </li>
              <li className={`menu-item ${activeTab === 'create-post' ? 'active' : ''}`}>
                <a href="#create-post" onClick={() => setActiveTab('create-post')}>Tạo Post</a>
              </li>
              <li className={`menu-item ${activeTab === 'manage-posts' ? 'active' : ''}`}>
                <a href="#manage-posts" onClick={() => setActiveTab('manage-posts')}>Quản lí bài post của tôi</a>
              </li>
            </ul>
          </aside>
          <section className="profile-content">
            {error && <p className="error-message">{error}</p>}
            {renderTabContent()}
          </section>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
