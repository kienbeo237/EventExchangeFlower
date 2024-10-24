import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeedbackList.css";

function FeedbackList({ productId }) {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, [productId]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/feedback/post/${productId}`);
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks: ", error);
    }
  };

  return (
    <div className="feedback-section">
      <h3>Phản hồi từ khách hàng</h3>
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((feedback, index) => (
            <li key={index} className="feedback-item">
              <p><strong>{feedback.customerName}</strong> - {feedback.rating}⭐</p>
              <p>{feedback.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Chưa có phản hồi nào.</p>
      )}
    </div>
  );
}

export default FeedbackList;
