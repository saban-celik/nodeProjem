// frontend/src/components/ProductCard.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductProps {
  id: number;
  name: string;
  weight: string;
  price: number;
  image: string;
}

const WHATSAPP_NUMBER = "905xx1234567"; // kendi numaranı buraya ekle

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  weight,
  price,
  image,
}) => {
  const { user } = useAuth();
  const router = useRouter();

  const resolvedImage = image?.startsWith("/uploads")
    ? `http://localhost:5000${image}`
    : image || "https://via.placeholder.com/300x200?text=No+Image";

  const handleAddFavorite = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    let favs: any[] = [];
    try {
      const raw = window.localStorage.getItem("favorites");
      favs = raw ? JSON.parse(raw) : [];
    } catch {
      favs = [];
    }

    if (!favs.find(f => f.id === id)) {
      favs.push({
        id,
        title: name,
        description: `${name} - ${weight}`,
        image: resolvedImage,
        price,           // artık price da var
      });
      window.localStorage.setItem("favorites", JSON.stringify(favs));
      alert("Ürün favorilere eklendi!");
    } else {
      alert("Bu ürün zaten favorilerinizde.");
    }
  };

  return (
    <div className="product-card">
      <img
        src={resolvedImage}
        alt={name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3><strong>{name}</strong></h3>
      <p><strong>{weight}</strong></p>
      <p><strong>Fiyat:</strong> {price.toFixed(2)} TL</p>
      <button
        className="custom-button w-full mt-2"
        onClick={handleAddFavorite}
      >
        Favorilere Ekle
      </button>
    </div>
  );
};

export default ProductCard;
