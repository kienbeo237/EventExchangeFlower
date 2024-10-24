// src/components/BestSellers.js
import React from 'react';

const bestSellers = [
  { id: 1, name: 'Red Roses', image: 'https://via.placeholder.com/150', price: '$50' },
  { id: 2, name: 'Orchids', image: 'https://via.placeholder.com/150', price: '$80' },
  { id: 3, name: 'Tulips', image: 'https://via.placeholder.com/150', price: '$60' },
];

const BestSellers = () => {
  return (
    <div className="best-sellers">
      <h2>Best Selling Flowers</h2>
      <div className="flower-grid">
        {bestSellers.map((flower) => (
          <div key={flower.id} className="flower-item">
            <img src={flower.image} alt={flower.name} />
            <h3>{flower.name}</h3>
            <p>{flower.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
