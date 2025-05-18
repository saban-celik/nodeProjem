//C:\webproje\celikoglu_baklava\frontend\src\components\Header.tsx
"use client";
import { Heart, Search, UserCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  favoritesCount: number;
}

export default function Header({ favoritesCount }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-dark-green text-white py-3 px-4 position-relative">
      <div className="d-flex justify-content-between align-items-center container">
        <div className="fw-bold fs-4">Çelikoğlu Baklava</div>
        <nav className="d-flex gap-4">
          <Link href="/" className="text-white text-decoration-none">
            BAKLAVALAR
          </Link>
          <Link href="/category/yoresel-urunler" className="text-white text-decoration-none">
            YÖRESEL ÜRÜNLER
          </Link>
        </nav>
        <div className="d-flex gap-3 align-items-center position-relative">

          {/* Arama Alanı */}
          <div className="d-flex align-items-center gap-2 position-relative">
            {showSearch && (
              <input
                type="text"
                placeholder="Ürün Ara..."
                className="form-control rounded shadow border-0"
                style={{ width: "200px" }}
              />
            )}
            <Search role="button" onClick={() => setShowSearch(!showSearch)} />
          </div>

          {/* Favoriler */}
          <div className="position-relative">
            <Heart role="button" />
            {favoritesCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.6rem" }}
              >
                {favoritesCount}
              </span>
            )}
          </div>

          {/* Profil Menüsü */}
          <div className="position-relative">
            <UserCircle role="button" onClick={() => setShowProfileMenu(!showProfileMenu)} />
            {showProfileMenu && (
              <div
                className="position-absolute bg-white text-dark rounded shadow p-2 mt-2"
                style={{ right: 0, top: "100%", minWidth: "180px", zIndex: 999 }}
              >
                <Link href="/login" className="d-block py-1 text-decoration-none text-dark">Giriş Yap</Link>
                <Link href="/register" className="d-block py-1 text-decoration-none text-dark">Kayıt Ol</Link>
                <Link href="/forgot-password" className="d-block py-1 text-decoration-none text-dark">Şifremi Unuttum</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
