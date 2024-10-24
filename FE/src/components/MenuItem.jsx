import React from 'react';
import '../styles/MenuItem.css';

function MenuItem({ title, description, price, imageUrl, status }) {
  return (
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${imageUrl})` }} className="menuItemImage"></div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>Price: {price}₫</span>
      <p>Status: {status}</p>
    </div>
  );
}

export default MenuItem;
