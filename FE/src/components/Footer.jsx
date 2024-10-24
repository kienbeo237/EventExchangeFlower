import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2>Event Flower Exchange Website</h2>
          <p>
            Khách hàng có thể liên hệ với chúng tôi qua các kênh dưới đây. Cảm ơn bạn và
            chúng tôi rất vinh dự khi có bạn là khách hàng của chúng tôi.
          </p>
          <div className="socialMedia">
            <TwitterIcon /> <FacebookIcon /> <LinkedInIcon /> <InstagramIcon />
          </div>
        </div>

        <div className="footer-section">
          <h3>HỖ TRỢ</h3>
          <ul>
            <li>Sản phẩm</li>
            <li>Trợ giúp & Hỗ trợ</li>
            <li>Chính sách hoàn trả</li>
            <li>Điều khoản sử dụng</li>
            <li>Câu hỏi thường gặp</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>CÁC CHI NHÁNH CỦA CHÚNG TÔI</h3>
          <ul>
            <li>Laos</li>
            <li>Thái Lan</li>
            <li>Nhật Bản</li>
            <li>Canada</li>
            <li>Hoa Kỳ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>PHƯƠNG THỨC THANH TOÁN</h3>
          <img src="../assets/payment-img/visa.png" alt="Visa" />
          <img src="mastercard.png" alt="MasterCard" />
          <img src="paypal.png" alt="VNPAY" />
          <img src="paypal.png" alt="Momo" />
        </div>

        <div className="footer-section contact-us">
          <h3>LIÊN HỆ VỚI CHÚNG TÔI</h3>
          <p>TP. Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam</p>
          <p>Điện thoại: +865 20 96863648</p>
          <p>Email: flowerparadise@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p> &copy; 2024 flower-paradise.com</p>
      </div>
    </div>
  );
}

export default Footer;
