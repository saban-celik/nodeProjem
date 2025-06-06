// C:\webproje\celikoglu_baklava\frontend\src\app\register\page.tsx
"use client";
import { loginUser } from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Şifreler eşleşmiyor!');
      return;
    }

    try {
      const trimmedName = name.trim(); // 🔧 Boşlukları temizle

      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email,
          password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Kayıt başarısız');
        return;
      }

      loginUser(data.user);

      if (data.user.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      alert('Sunucu hatası');
    }
  };


  return (
    <div className="container">
      <h1 className="mb-4">Kayıt Ol</h1>
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Ad Soyad</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-posta</label>
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
          <label htmlFor="password" className="form-label">Şifre</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Şifre Tekrar</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="custom-button w-100 mb-3">Kayıt Ol</button>
        <div className="text-center">
          <Link href="/login">Zaten hesabın var mı? Giriş Yap</Link>
        </div>
      </form>
    </div>
  );
}
