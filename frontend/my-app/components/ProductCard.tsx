'use client'
import React from 'react';

interface Product {
  name: string;
  image: string;
  amount: string;
  price: string;
  choice: boolean;
  link: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const cardClassName = `bg-white rounded overflow-hidden shadow-md ${
    product.choice ? 'bg-yellow-200' : '' // Apply yellow background if choice is true
  }`;

  return (
    <div className={cardClassName}>
      {/* Adjusted the height of the image */}
      <img
        className="w-[250px] mx-auto"
        referrerPolicy="no-referrer"
        src={`http://${product.image}`}
        alt={product.name}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 truncate">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.amount}</p>
        <p className="text-blue-500 font-semibold">{product.price}</p>
        <a
          href={`http://${product.link}`}
          className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
