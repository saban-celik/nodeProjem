"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Giriş yapma mantığını burada uygulayın (ör. API çağrısı)
    console.log('Giriş denemesi:', { email, password });
  };

  return (
    <div className="container">
      <h1 className="mb-4">Giriş Yap</h1>
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
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Şifre
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="custom-button w-100 mb-3">
          Giriş Yap
        </button>
        <div className="text-center">
          <Link href="/forgot-password" className="text-decoration-none">
            Şifremi Unuttum
          </Link>
        </div>
        <div className="text-center mt-2">
          <Link href="/register" className="text-decoration-none">
            Hesabın yok mu? Kayıt Ol
          </Link>
        </div>
      </form>
    </div>
  );
}