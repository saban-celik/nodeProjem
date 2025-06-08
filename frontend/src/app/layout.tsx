// C:\webproje\celikoglu_baklava\frontend\src\app\layout.tsx
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  const handleAddToFavorites = () => {
    setFavoritesCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).addToFavorites = handleAddToFavorites;

      const trackVisit = async () => {
        const pageUrl = window.location.pathname;
        const storageKey = `visited:${pageUrl}`;

        try {
          const csrfRes = await fetch("http://localhost:5000/api/csrf-token", {
            credentials: "include",
          });
          const csrfData = await csrfRes.json();
          const csrfToken = csrfData.csrfToken;

          const postRes = await fetch("http://localhost:5000/api/visits/increment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "XSRF-TOKEN": csrfToken,
            },
            body: JSON.stringify({ page_url: pageUrl }),
            credentials: "include",
          });

          const data = await postRes.json();
          console.log("✅ Ziyaret kaydedildi:", data);

          // Ziyaret bilgisi localStorage'a zaman damgası ile kaydedilir (isteğe bağlı)
          localStorage.setItem(storageKey, Date.now().toString());
        } catch (error) {
          console.error("❌ Ziyaret takibi hatası:", error);
        }
      };

      trackVisit();
    }
  }, [pathname]);

  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0 }}>
        {!isAdminPage && <Header favoritesCount={favoritesCount} />}
        <main className={isAdminPage ? "" : "my-4"}>{children}</main>
      </body>
    </html>
  );
}