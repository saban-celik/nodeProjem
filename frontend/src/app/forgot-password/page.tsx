"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Şifre sıfırlama mantığını burada uygulayın (ör. API çağrısı)
    console.log('Şifre sıfırlama talebi:', { email });
  };

  return (
    <div className="container">
      <h1 className="mb-4">Şifremi Unuttum</h1>
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-posta
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="custom-button w-100 mb-3">
          Şifre Sıfırlama Bağlantısı Gönder
        </button>
        <div className="text-center">
          <Link href="/login" className="text-decoration-none">
            Giriş Yap
          </Link>
        </div>
      </form>
    </div>
  );
}