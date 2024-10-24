import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChangeInfor.css'; 

const ChangeInfoPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    address: '',
    phoneNumber: ''
  });

  const [userID, setUserID] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // Điều khiển hiển thị pop-up
  const [popupMessage, setPopupMessage] = useState(''); // Thông điệp hiển thị trong pop-up

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserID(parsedUser.userID);
    } else {
      setErrorMessage('User ID not found');
    }
  }, []);

  useEffect(() => {
    if (userID) {
      axios.get(`http://localhost:8080/identity/users/${userID}`)
        .then(response => {
          setFormData({
            username: response.data.username,
            address: response.data.address,
            phoneNumber: response.data.phoneNumber
          });
        })
        .catch(error => {
          setErrorMessage('Error fetching user data');
        });
    }
  }, [userID]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userID) {
      axios.put(`http://localhost:8080/identity/users/${userID}`, formData)
        .then(response => {
          // setSuccessMessage('Cập nhật thông tin thành công');
          setPopupMessage("Cập nhật thông tin thành công!");
          setShowPopup(true); // Hiển thị pop-up


          // Cập nhật localStorage sau khi thay đổi thông tin thành công
          const updatedUser = {
            ...JSON.parse(localStorage.getItem('user')),
            username: formData.username,
            address: formData.address,
            phoneNumber: formData.phoneNumber,
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));

          setErrorMessage('');
        })
        .catch(error => {
          if (error.response) {
            setErrorMessage(error.response.data.message || 'Failed to update user');
          } else {
            setErrorMessage('Failed to update user');
          }
        });
    } else {
      setErrorMessage('User ID is missing');
    }
  };

  return (
    <div className="change-info-container">
      <h2>Thay đổi thông tin</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="change-info-form">
        <div>
          <label>Tên người dùng: </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mật khẩu: </label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Địa chỉ: </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Số điện thoại: </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Cập nhật</button>
      </form>


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
              }}>
              Đóng
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ChangeInfoPage;
