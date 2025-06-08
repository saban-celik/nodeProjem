// src/hooks/useAuth.ts
import { fetchCsrfToken, fetchUserById } from '@/utils/api';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin?: boolean;
}

let globalSetUser: ((u: User | null) => void) | null = null;

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    globalSetUser = setUser;

    // 🔐 CSRF token'ı sunucudan al
    fetchCsrfToken().catch(err => {
      console.error("❌ CSRF token alınamadı:", err);
    });

    const stored = localStorage.getItem("user");

    if (stored && stored !== "undefined") {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.id) {
          fetchUserById(parsed.id)
            .then(data => setUser(data))
            .catch(() => setUser(null));
        } else {
          setUser(null);
        }
      } catch (e) {
        console.error("Geçersiz localStorage verisi:", e);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    return () => {
      globalSetUser = null;
    };
  }, []);

  return { user };
};

export const loginUser = (user: User) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    if (globalSetUser) globalSetUser(user);
  } catch (err) {
    console.error("localStorage yazılamadı:", err);
  }
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  if (globalSetUser) globalSetUser(null);
};
