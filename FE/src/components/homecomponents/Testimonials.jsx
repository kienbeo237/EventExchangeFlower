import React from "react";
import Slider from "react-slick";
import "./Testimonials.css";

function Testimonials() {
  const settings = {
    dots: false, // Hiển thị dấu chấm để di chuyển giữa các slide
    infinite: true, // Lặp lại carousel khi hết slide
    speed: 500, // Tốc độ chuyển đổi slide (ms)
    slidesToShow: 1, // Hiển thị 1 slide mỗi lần
    slidesToScroll: 1, // Cuộn 1 slide mỗi lần
    autoplay: true, // Tự động cuộn
    autoplaySpeed: 3000, // Tốc độ tự động cuộn (ms)
  };

  const testimonials = [
    {
      feedback:
        "Hoa rất tươi, hương thơm dễ chịu, giao hàng nhanh, giá cả hợp lý.",
       name: "Trần Linh",
    },
    {
      feedback:
        "Hoa được gói rất đẹp và cẩn thận, nhân viên chu đáo và nhiệt tình.",
      name: "Nguyên An",
    },
    {
      feedback:
        "Giao hàng rất nhanh, hoa vẫn tươi khi nhận, rất hài lòng.",
      name: "Tuấn Trần",
    },
    {
      feedback:
        "Dịch vụ tuyệt vời, hoa đúng mẫu, người nhận rất thích.",
      name: "Lê Minh",
    },
    {
      feedback:
        "Hoa đẹp và tươi, giao hàng đúng giờ, sẽ ủng hộ lần sau.",
      name: "Mai Hương",
    },
    {
      feedback:
        "Mình rất hài lòng với chất lượng hoa, sẽ giới thiệu cho bạn bè.",
      name: "Thảo Nguyễn",
    },
    {
      feedback:
        "Hoa thơm và tươi lâu, giao hàng nhanh chóng và đúng hẹn.",
      name: "Phương Anh",
    },
    {
      feedback:
        "Đóng gói cẩn thận, hoa tươi đẹp, chất lượng dịch vụ tốt.",
      name: "Hồng Nhung",
    },
    {
      feedback:
        "Rất thích cách gói hoa tinh tế, giá cả phải chăng.",
      name: "Duy Khang",
    },
    
  ];

  return (
    <div className="about-testimonials">
      <h2>Khách hàng nói gì</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-slide" key={index}>
            <p>"{testimonial.feedback}"</p>
            <h3>{testimonial.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Testimonials;
