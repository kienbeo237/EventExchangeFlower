import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RelatedPosts.css";

function RelatedPosts({ currentProductId }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const navigate = useNavigate();

  useEffect(() => {
    fetchRelatedPosts();
  }, [currentProductId]);

  // Hàm chọn ngẫu nhiên 4 phần tử từ mảng
  const getRandomPosts = (posts, numberOfPosts) => {
    const shuffled = [...posts].sort(() => 0.5 - Math.random()); // Sắp xếp ngẫu nhiên
    return shuffled.slice(0, numberOfPosts); // Chọn 4 phần tử đầu tiên
  };
  const handlePostClick = (id) => {
    navigate(`/flower/${id}`); // Điều hướng sang trang chi tiết với ID
  };

  const fetchRelatedPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/identity/posts/");
      const filteredPosts = response.data.filter(item => item.id !== currentProductId);
      
      // Chọn ngẫu nhiên 4 bài
      const randomPosts = getRandomPosts(filteredPosts, 4);
      setRelatedPosts(randomPosts);
      setLoading(false); // Stop loading once data is fetched
    } catch (error) {
      setError("Failed to load related products. Please try again later.");
      setLoading(false); // Stop loading on error
    }
  };

  // Display loading spinner or message
  if (loading) {
    return <div className="loading">Đang tải các sản phẩm liên quan...</div>;
  }

  // Display error message if fetching fails
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="related-posts-section">
      <h3>Các sản phẩm khác</h3>
      <div className="post-grid">
        {relatedPosts.map((item, index) => (
          <div
            className="post-card"
            key={index}
            oonClick={() => handlePostClick(item.id)} // Điều hướng đến chi tiết bài viết
          >
            <img
            //   src={item.imageUrl || a2} // Use API image if available, fallback to default image
              alt={item.title}
              className="post-card-image"
            />
            <h3>{item.title}</h3>
            <p className="discount-price">Giá: {item.price}₫</p>
            <p className="feature-content">{item.description}</p>
            <p className="feature-detail">Xem chi tiết</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedPosts;
