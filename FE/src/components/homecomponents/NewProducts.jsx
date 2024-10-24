// src/homecomponents/NewProducts.js
import React from 'react';
import './NewProducts.css';
 // Đảm bảo rằng CSS liên quan nằm trong file này

function NewProducts() {
  return (
    <div className="newProducts">
      <h2>Các loại hoa được tìm kiếm nhiều nhất</h2>
      <div className="productContainer">
        <div className="productItem">
          <img src="/flowerimgs/flower1.jpg" alt="Hoa Khai Trương" />
          <p>Hoa Khai Trương</p>
        </div>
        <div className="productItem">
          <img src="/flowerimgs/flower2.jpg" alt="Bó Hoa" />
          <p>Bó Hoa</p>
        </div>
        <div className="productItem">
          <img src="/flowerimgs/flower7.jpg" alt="Giỏ Hoa" />
          <p>Giỏ Hoa</p>
        </div>
        <div className="productItem">
          <img src="/flowerimgs/flower5.jpg" alt="Hoa Chia Buồn" />
          <p>Hoa Chia Buồn</p>
        </div>
      </div>
    </div>
  );
}

export default NewProducts;
