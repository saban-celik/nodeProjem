// C:\webproje\celikoglu_baklava\frontend\src\app\page.tsx
"use client";

import Footer from "@/components/Footer";
import { fetchAnnouncements, fetchVideos, VideoItem } from "@/utils/api";
import { useEffect, useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image?: string;
  media?: string;
}

interface AnnouncementItem {
  id?: number;
  title: string;
  content: string;
}

export default function HomePage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [announcementLoading, setAnnouncementLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [announcementError, setAnnouncementError] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const images = [
    "https://www.celebiogullari.com.tr/UserFiles/Fotograflar/1868-slider-1.png",
    "https://www.celebiogullari.com.tr/UserFiles/Fotograflar/1869-slider-2.jpg",
    "https://www.celebiogullari.com.tr/UserFiles/Fotograflar/1674-basliksiz-1.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:5000/api/news");
        if (!res.ok) throw new Error("Haberler çekilemedi");
        setNewsItems(await res.json());
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setVideos(await fetchVideos());
      } catch (e: any) {
        setVideoError(e.message);
      } finally {
        setVideoLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAnnouncements();
        setAnnouncements(data);
      } catch (e: any) {
        setAnnouncementError(e.message);
        console.error("Duyurular çekilirken hata:", e.message);
      } finally {
        setAnnouncementLoading(false);
      }
    })();
  }, []);

  const getMediaSrc = (item: NewsItem | VideoItem) => {
    const src =
      (item as NewsItem).media ||
      (item as NewsItem).image ||
      (item as VideoItem).url ||
      "";
    return src.startsWith("/uploads/") ? `http://localhost:5000${src}` : src;
  };

  const isVideo = (s: string) => /\.(mp4|webm)$/i.test(s);

  return (
    <>
      <div
        className="responsive-wrapper text-center position-relative"
        style={{ maxWidth: "100%", padding: 0, margin: 0, marginTop: "-10px" }} // Negatif margin-top eklendi
      >
        <div className="announcement-ticker">
          <div className="ticker-content">
            {announcementLoading && <span className="ticker-item">Duyurular yükleniyor...</span>}
            {announcementError && (
              <span className="ticker-item" style={{ color: "var(--badge-red)" }}>
                Hata: {announcementError}
              </span>
            )}
            {!announcementLoading && !announcementError && announcements.length === 0 && (
              <span className="ticker-item">Henüz duyuru bulunmamaktadır.</span>
            )}
            {!announcementLoading && !announcementError && announcements.length > 0 && (
              <>
                {announcements.map((announcement, index) => (
                  <span key={index} className="ticker-item">
                    <strong>{announcement.title}:</strong> {announcement.content}
                  </span>
                ))}
                {announcements.map((announcement, index) => (
                  <span key={`duplicate-1-${index}`} className="ticker-item">
                    <strong>{announcement.title}:</strong> {announcement.content}
                  </span>
                ))}
                {announcements.map((announcement, index) => (
                  <span key={`duplicate-2-${index}`} className="ticker-item">
                    <strong>{announcement.title}:</strong> {announcement.content}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>

        <h1 className="title">Çelikoğlu Baklava'ya Hoş Geldiniz</h1>
        <p className="hoverMoveUp" title="Yukarıdaki menüden seçim yapınız">
          Bir şey seçin
          <span aria-hidden="true" className="bounceArrow">
            ↑
          </span>
        </p>

        <div className="sliderContainer" aria-label="Ana slider">
          <img
            src={images[currentIndex]}
            alt={`Slider ${currentIndex + 1}`}
            className="sliderImage"
          />
          <button
            className="prev"
            onClick={() =>
              setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))
            }
            aria-label="Önceki"
          >
            ‹
          </button>
          <button
            className="next"
            onClick={() =>
              setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))
            }
            aria-label="Sonraki"
          >
            ›
          </button>
        </div>

        <div className="video-section" style={{ marginTop: "3rem" }}>
          <div className="container" style={{ maxWidth: 1400, padding: 0 }}>
            <h2 className="dashboard__title">Videolarımız</h2>
            {videoLoading && <p>Videolar yükleniyor...</p>}
            {videoError && (
              <p style={{ color: "var(--badge-red)" }}>Hata: {videoError}</p>
            )}
            {!videoLoading && !videoError && videos.length === 0 && (
              <p>Henüz yayınlanmış video bulunmamaktadır.</p>
            )}
            {!videoLoading && !videoError && videos.length > 0 && (
              <div className="video-showcase">
                {videos.map((v) => {
                  const src = getMediaSrc(v);
                  return (
                    <div
                      key={v.id}
                      className="video-showcase__card"
                      onClick={() => setActiveVideo(src)}
                    >
                      <video
                        src={src}
                        className="video-showcase__video"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <h2 className="dashboard__title" style={{ marginTop: "3rem" }}>
          Son Haberler
        </h2>
        {loading && <p>Haberler yükleniyor...</p>}
        {error && (
          <p style={{ color: "var(--badge-red)" }}>Hata: {error}</p>
        )}
        {!loading && !error && newsItems.length === 0 && (
          <p>Henüz yayınlanmış haber bulunmamaktadır.</p>
        )}
        <div className="news-grid">
          {newsItems.map((item) => {
            const src = getMediaSrc(item);
            return (
              <article
                key={item.id}
                className="news-card"
                tabIndex={0}
                aria-label={`Haber: ${item.title}`}
              >
                <div className="news-media">
                  {src ? (
                    isVideo(src) ? (
                      <video src={src} controls preload="metadata" />
                    ) : (
                      <img src={src} alt={item.title} loading="lazy" />
                    )
                  ) : (
                    <div style={{ color: "var(--secondary)" }}>
                      Medya Yok
                    </div>
                  )}
                </div>
                <div className="news-content">
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-desc">
                    {item.content.length > 200
                      ? item.content.slice(0, 200) + "..."
                      : item.content}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <Footer />

      {activeVideo && (
        <div className="video-modal">
          <div
            className="video-modal__backdrop"
            onClick={() => setActiveVideo(null)}
          />
          <div className="video-modal__content">
            <video
              src={activeVideo}
              className="video-modal__video"
              controls
              autoPlay
            />
            <button
              className="video-modal__close"
              onClick={() => setActiveVideo(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}