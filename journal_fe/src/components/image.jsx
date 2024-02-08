import React from 'react';

function CategoryImage({ category }) {
  const baseUrl = "https://source.unsplash.com/featured/640x480";
  const url = `${baseUrl}?${category}`;

  return (
    <div className="category-image-container">
      <img src={url} alt="Category" className="category-image" />
    </div>
  );
}

export default CategoryImage;

