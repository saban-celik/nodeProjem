//C:\webproje\celikoglu_baklava\frontend\src\app\admin\statistics\page.tsx
"use client";

import { fetchVisitStats } from '@/utils/api';
import { useEffect, useState } from 'react';

interface VisitStat {
  total_visits: number;
  visit_day: string;
}

export default function StatisticsPage() {
  const [visitStats, setVisitStats] = useState<VisitStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchVisitStats();
        setVisitStats(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p style={{ color: 'var(--text)' }}>İstatistikler yükleniyor...</p>;
  if (error) return <p style={{ color: 'var(--badge-red)' }}>Hata: {error}</p>;

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '1400px' }}>
      <h1 className="dashboard__title">Ziyaretçi İstatistikleri</h1>
      {visitStats.length === 0 ? (
        <p style={{ color: 'var(--text)' }}>Henüz ziyaretçi verisi bulunmamaktadır.</p>
      ) : (
        <>
          <p style={{ fontSize: '1.2rem', color: 'var(--darkGreen)', fontWeight: '500' }}>
            Toplam Ziyaret: {visitStats.reduce((sum, stat) => sum + stat.total_visits, 0)}
          </p>
          <h2 className="recent-activity__title">Ziyaret Detayları</h2>
          <div className="recent-activity__table" style={{ overflowX: 'auto' }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{ backgroundColor: 'var(--primary)', color: 'var(--text)' }}>Tarih</th>
                  <th style={{ backgroundColor: 'var(--primary)', color: 'var(--text)' }}>Ziyaret Sayısı</th>
                </tr>
              </thead>
              <tbody>
                {visitStats.map((stat, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid var(--gray-border)', padding: '0.6rem' }}>{stat.visit_day}</td>
                    <td style={{ border: '1px solid var(--gray-border)', padding: '0.6rem' }}>{stat.total_visits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}