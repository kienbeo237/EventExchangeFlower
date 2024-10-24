import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagePosts.css'; // Add CSS for styling

const ManagePosts = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flowers, setFlowers] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // For editing
  const [userID, setUserID] = useState(null); // State to hold userID
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserID(parsedUser.userID); // Gán userID
    }
  }, []);
  
  useEffect(() => {
    if (userID) {
      fetchPosts();
    }
  }, [userID]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/identity/posts/api/${userID}`);
      setPosts(response.data || []); // Đảm bảo posts là một mảng
      setLoading(false);
    } catch (error) {
      console.error('Lỗi khi tải danh sách bài post:', error);
      setLoading(false);
    }
  };

  const deletePost = async (postID) => {
    try {
      await axios.delete(`http://localhost:8080/identity/posts/${postID}`);
      setPosts(posts.filter(post => post.postID !== postID)); // Remove deleted post from the list
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
  };

  const handleSavePost = async () => {
    try {
      await axios.put(`http://localhost:8080/identity/posts/${selectedPost.postID}`, selectedPost);
      setSelectedPost(null); // Clear the editing form
      fetchPosts(); // Refresh posts
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPost({ ...selectedPost, [name]: value });
  };

  return (
    <div className="manage-posts">
      <h2>Quản lý bài post của tôi</h2>

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.postID} className="post-container">
                {/* Mục 1: Quản lý bài post */}
                <div className="post-item">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <p>Giá: {post.price} VNĐ</p>
                  
                  <div className="post-actions">
                    <button onClick={() => deletePost(post.postID)}>Xóa bài post</button>
                    <button onClick={() => handleEditPost(post)}>Sửa bài post</button>
                  </div>
                </div>

                {/* Mục 2: Hiển thị hoa đã đăng */}
                <div className="flower-posts">
                  <h4>Các loại hoa trong bài viết:</h4>
                  {post.flowerBatches.length > 0 ? (
                    post.flowerBatches.map((flower) => (
                      <div key={flower.flowerID} className="flower-item">
                        {/* <img src={flower.imageUrl} alt={flower.flowerName} className="flower-image" /> */}
                        <p>Tên hoa: {flower.flowerName}</p>
                        <p>Số lượng: {flower.quantity}</p>
                        <p>Giá: {flower.price} VNĐ</p>
                        <p>Mô tả: {flower.description}</p>
                      </div>
                    ))
                  ) : (
                    <p>Không có hoa nào trong bài viết.</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Không có bài post nào.</p>
          )}
        </>
      )}

      {/* Form chỉnh sửa bài post */}
      {selectedPost && (
        <div className="edit-post-form">
          <h3>Chỉnh sửa bài post</h3>
          <input
            type="text"
            name="title"
            value={selectedPost.title}
            onChange={handleChange}
            placeholder="Tiêu đề"
          />
          <textarea
            name="description"
            value={selectedPost.description}
            onChange={handleChange}
            placeholder="Nội dung"
          />
          <input
            type="number"
            name="price"
            value={selectedPost.price}
            onChange={handleChange}
            placeholder="Giá"
          />
          <button onClick={handleSavePost}>Lưu</button>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;
