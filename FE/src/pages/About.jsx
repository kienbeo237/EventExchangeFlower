import React, { useState, useEffect } from "react";
import { FaSeedling, FaStore, FaHandHoldingHeart, FaLeaf } from "react-icons/fa";
import "../styles/About.css"; // Assuming the file is located in `src/styles/`
import backAbout from "../assets/about-img/back-about.jpg";
import a1 from "../assets/about-img/a1.jpg";
import a2 from "../assets/about-img/a2.jpg";
import Footer from "../components/Footer";
import Introduction from '../components/aboutcomponents/Introduction';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const About = () => {
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
    <div className="about">
      {/* Banner Section */}
      <div className="about-banner">
        <img
          src={backAbout}
          alt="Beautiful Flower Banner"
          className="banner-image"
        />
        <div className="banner-text">
          <h1>Flower Exchange Website</h1>
          <p>Your one-stop marketplace for beautiful and fresh flowers.</p>
        </div>
      </div>

      {/* About Us Content */}
      <Introduction />



      {/* Cards Section */}
      <div className="about-section">
        <div className="about-card">
          <FaStore className="about-icon" />
          <h2>Website của chúng tôi</h2>
          <p> Flower Exchange Website là một nền tảng đáng tin cậy để người bán đăng bán
           nhiều loại hoa, từ hoa hồng đến các lẵng hoa kỳ lạ. Sứ mệnh của chúng tôi là kết nối những người yêu hoa với các nhà hoa tài năng, 
           những người tạo ra những lẵng hoa đẹp nhất.
          </p>
        </div>

        <div className="about-card">
          <FaSeedling className="about-icon" />
          <h2>Cho Người Bán</h2>
          <p>
          Trở thành người bán và thể hiện sự sáng tạo nghệ thuật của bạn! Đăng sản phẩm của bạn với những hình ảnh đẹp, 
          mô tả chi tiết và giá cả. Tiếp cận khách hàng trên toàn quốc và phát triển doanh nghiệp hoa của bạn dễ dàng.
          </p>
        </div>

        <div className="about-card">
          <FaHandHoldingHeart className="about-icon" />
          <h2>Cho Khách Hàng</h2>
          <p>
          Cho dù bạn đang tìm kiếm một bó hoa đơn giản hay một lẵng hoa tùy chỉnh lớn,
          bạn sẽ tìm thấy những bông hoa hoàn hảo cho bất kỳ dịp nào. Hỗ trợ các doanh nghiệp địa phương bằng cách mua từ những người bán gần bạn, hoặc khám phá những loài hoa kỳ lạ từ khắp nơi trên thế giới.
          </p>
        </div>

        
      </div>

    <Footer/>
    </div>
  
  );
};

export default About;
