// src/components/FeaturedFlowers.js
import React from 'react';

const featuredFlowers = [
  { id: 1, name: 'Sunflowers', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Lilies', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Daisies', image: 'https://via.placeholder.com/150' },
];

const FeaturedFlowers = () => {
  return (
    <div className="featured-flowers">
      <h2>Beautiful Flowers</h2>
      <div className="flower-grid">
        {featuredFlowers.map((flower) => (
          <div key={flower.id} className="flower-item">
            <img src={flower.image} alt={flower.name} />
            <h3>{flower.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedFlowers;
