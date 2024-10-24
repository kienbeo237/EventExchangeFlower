import React, { useState } from "react";
import "../styles/Payment.css";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleCustomerInfoChange = (event) => {
    const { name, value } = event.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    const { name, phone, email, address } = customerInfo;
    if (!name || !phone || !email || !address) {
      alert("Vui lòng nhập đầy đủ thông tin khách hàng");
      return;
    }
    
    if (selectedPaymentMethod === "momo") {
      alert(`Thông tin khách hàng: ${JSON.stringify(customerInfo)}\nBạn đã chọn thanh toán bằng MoMo`);
    } else if (selectedPaymentMethod === "vnpay") {
      alert(`Thông tin khách hàng: ${JSON.stringify(customerInfo)}\nBạn đã chọn thanh toán bằng VNPAY`);
    } else {
      alert("Vui lòng chọn phương thức thanh toán");
    }
  };

  return (
    <div className="payment-page">
      <div className="order-customer-container">
        {/* Thông tin đơn hàng */}
        <div className="order-info">
          <h2>Thông tin đơn hàng</h2>
          <p>Sản phẩm: Hoa hồng</p>
          <p>Số lượng: 2</p>
          <p>Tổng cộng: 500,000 VND</p>
        </div>

        {/* Thông tin khách hàng */}
        <div className="customer-info">
          <h3>Thông tin khách hàng</h3>
          <label>
            Họ và tên:
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleCustomerInfoChange}
              placeholder="Nhập họ và tên"
            />
          </label>
          <label>
            Số điện thoại:
            <input
              type="text"
              name="phone"
              value={customerInfo.phone}
              onChange={handleCustomerInfoChange}
              placeholder="Nhập số điện thoại"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleCustomerInfoChange}
              placeholder="Nhập email"
            />
          </label>
          <label>
            Địa chỉ:
            <input
              type="text"
              name="address"
              value={customerInfo.address}
              onChange={handleCustomerInfoChange}
              placeholder="Nhập địa chỉ"
            />
          </label>
        </div>
      </div>

      {/* Phương thức thanh toán */}
      <div className="payment-methods">
        <h3>Chọn phương thức thanh toán:</h3>
        <label>
          <input
            type="radio"
            value="momo"
            checked={selectedPaymentMethod === "momo"}
            onChange={handlePaymentMethodChange}
          />
          Thanh toán bằng MoMo
        </label>
        <label>
          <input
            type="radio"
            value="vnpay"
            checked={selectedPaymentMethod === "vnpay"}
            onChange={handlePaymentMethodChange}
          />
          Thanh toán bằng VNPAY
        </label>
      </div>

      <button onClick={handlePayment}>Thanh toán ngay</button>

      {selectedPaymentMethod === "momo" && (
        <div>
          <h4>Quét mã QR MoMo để thanh toán</h4>
          <img src="path/to/momo-qr.png" alt="MoMo QR Code" />
        </div>
      )}

      {selectedPaymentMethod === "vnpay" && (
        <div>
          <h4>Quét mã QR VNPAY để thanh toán</h4>
          <img src="path/to/vnpay-qr.png" alt="VNPAY QR Code" />
        </div>
      )}
    </div>
  );
};

export default Payment;
