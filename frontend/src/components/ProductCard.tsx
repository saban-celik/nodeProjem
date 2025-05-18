//C:\webproje\celikoglu_baklava\frontend\src\components\ProductCard.tsx
"use client";
import React from 'react';

interface ProductProps {
  name: string;
  price: number;
  image: string;
  onFavorite: () => void; // Favorilere ekleme için prop
}

const ProductCard: React.FC<ProductProps> = ({ name, price, image, onFavorite }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} style={{ width: '100%', borderRadius: '8px' }} />
      <h2>{name}</h2>
      <p>{price.toFixed(2)} TL</p>
      <button onClick={onFavorite}>Favorilere Ekle</button>
    </div>
  );
};

export default ProductCard;