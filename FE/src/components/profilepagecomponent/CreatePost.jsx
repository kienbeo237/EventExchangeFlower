import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateFlowerForm from './CreateFlowerForm'; // Import the CreateFlowerForm component
import './CreatePos.css'; // Import file CSS

const CreatePostComponent = () => {
  // Lấy thông tin user từ localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const [showPopup, setShowPopup] = useState(false); // Điều khiển hiển thị pop-up
  const [popupMessage, setPopupMessage] = useState(''); // Thông điệp hiển thị trong pop-up
  // State cho bài đăng
  const [post, setPost] = useState({
    title: '',
    description: '',
    imageUrl: '',
    user: {
      userID: user ? user.userID : '',
    },
  });

  // State cho thông báo và postID
  const [postID, setPostID] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Xử lý khi có thay đổi trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi request POST đến server với dữ liệu trong post
      const response = await axios.post('http://localhost:8080/identity/posts/', post);
      setPostID(response.data.postID); // Lưu lại postID
      // setSuccessMessage('Đã tạo bài đăng thành công!');
      
      setError('');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Không thể tạo bài đăng. Vui lòng thử lại.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="create-post-component">
      <h2>Tạo Bài Đăng Mới</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Tiêu đề:
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mô tả:
          <textarea
            name="description"
            value={post.description}
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Giá dự kiến
          <input
            type="number"
            name="price"
            value={post.price}
            onChange={handleChange}
            // required
          />
        </label>

        <label>
          URL hình ảnh:
          <input
            type="text"
            name="imageUrl"
            value={post.imageUrl}
            onChange={handleChange}
            // required
          />
        </label>

        <button type="submit">Tạo Bài Đăng</button>
        {error && <p className="error-message-post">{error}</p>}
        {successMessage && <p className="success-message-post">{successMessage}</p>}
      </form>

      {/* Show form to add flowers if the post is successfully created */}
      {postID && <CreateFlowerForm postID={postID} />}
    </div>
  );
};

export default CreatePostComponent;
