"use client";
import Link from "next/link";

export default function AuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded shadow p-4"
        style={{ minWidth: "300px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h5 className="mb-3">Hesap İşlemleri</h5>
        <div className="d-flex flex-column gap-2">
          <Link href="/login" className="btn btn-outline-dark">
            Giriş Yap
          </Link>
          <Link href="/register" className="btn btn-outline-dark">
            Kayıt Ol
          </Link>
          <Link href="/forgot-password" className="btn btn-outline-dark">
            Şifremi Unuttum
          </Link>
        </div>
        <button className="btn btn-link mt-3" onClick={onClose}>
          Kapat
        </button>
      </div>
    </div>
  );
}
