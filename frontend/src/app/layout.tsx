//C:\webproje\celikoglu_baklava\frontend\src\app\layout.tsx
"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Header from '../components/Header';
import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Favorilere ekleme işlevi
  const handleAddToFavorites = () => {
    setFavoritesCount((prev) => prev + 1);
  };

  // Global olarak erişilebilir yapmak için
  if (typeof window !== 'undefined') {
    (window as any).addToFavorites = handleAddToFavorites;
  }

  return (
    <html lang="tr">
      <body>
        <Header favoritesCount={favoritesCount} />
        <main className="my-4">{children}</main>
      </body>
    </html>
  );
}