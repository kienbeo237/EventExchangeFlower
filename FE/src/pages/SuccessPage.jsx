import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SuccessPage.css'; // Your CSS file
import useGetParams from '../hooks/useGetParams'; // Đảm bảo đường dẫn chính xác
import { Sync } from '@material-ui/icons'; // Đảm bảo rằng bạn đang sử dụng Sync nếu cần
import axios from 'axios';

const SuccessPage = () => {
const navigate = useNavigate();
const getParams = useGetParams(); // Gọi hàm để lấy giá trị tham số
const vnp_TxnRef = getParams("vnp_TxnRef");
const vnp_ResponseCode = getParams("vnp_ResponseCode");
const vnp_TransactionStatus = getParams("vnp_TransactionStatus");

console.log("vnp_TxnRef:", vnp_TxnRef); // In ra giá trị của vnp_TxnRef
console.log("vnp_ResponseCode:", vnp_ResponseCode); // In ra giá trị của vnp_ResponseCode
console.log("Transaction Status:", vnp_TransactionStatus); // In ra giá trị của vnp_TransactionStatus

const updateOrderStatus = async () => {   
 try {
   const response = await axios.post(`http://localhost:8080/identity/orders/payments/success?vnp_TxnRef=${vnp_TxnRef}&vnp_ResponseCode=${vnp_ResponseCode}&vnp_TransactionStatus=${vnp_TransactionStatus}`);
 } catch (e) {
   console.log(e);
 }
}

useEffect(() => {
   if (vnp_TransactionStatus === "00") {
    updateOrderStatus();
   } else {
     navigate('/');
   }
}, [vnp_TxnRef, vnp_ResponseCode, vnp_TransactionStatus]); // Thêm các dependency

// Function to handle redirect
const handleGoHome = () => {
 navigate('/');
};

return (
 <div className="success-page">
   <div className="success-content">
     <h1>Thanh toán thành công</h1>
     <p>Bạn đã đặt hàng thành công và sẽ nhận được sản phẩm trong vòng 3 ngày</p>
     <div className="success-icon">
       <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" className="bi bi-check-circle-fill green-icon" viewBox="0 0 16 16">
         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 10.97L4.47 8.47a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 0 0-1.06-1.06L6.97 10.97z" />
       </svg>
     </div>
     <button className="go-home-btn" onClick={handleGoHome}>Quay về trang chủ</button>
   </div>
   {/* <Footer/> */}
 </div>
);
};

export default SuccessPage;