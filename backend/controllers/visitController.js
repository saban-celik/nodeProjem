// C:\webproje\celikoglu_baklava\backend\controllers\visitController.js
const db = require('../config/db');

exports.incrementVisit = (req, res) => {
  const { page_url } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  console.log('📥 İstek alındı - IP:', ip, 'Page URL:', page_url, 'User Agent:', userAgent);
  console.log('🔍 checkQuery parametreleri:', [ip, today]);
  console.log('🔍 Mevcut tarih:', new Date().toISOString());

  const checkQuery = `
    SELECT id FROM visits
    WHERE ip_address = ? AND DATE(visit_date) = ?
  `;

  db.query(checkQuery, [ip, today], (err, results) => {
    if (err) {
      console.error('❌ Kontrol hatası:', err);
      return res.status(500).json({ error: 'Kontrol hatası', details: err.message });
    }

    console.log('🔎 Kontrol sonucu - Bulunan kayıtlar:', results.length);

    if (results.length > 0) {
      console.log('🔁 Bu IP zaten bugün bu sayfayı ziyaret etmiş:', ip);
      return res.status(200).json({ message: 'Ziyaret zaten kaydedilmiş' });
    }

    const insertQuery = `
      INSERT INTO visits (page_url, ip_address, user_agent, visit_date)
      VALUES (?, ?, ?, NOW())
    `;
    db.query(insertQuery, [page_url || '/', ip, userAgent], (err, result) => {
      if (err) {
        console.error('❌ Ziyaret kaydedilemedi:', err);
        return res.status(500).json({ error: 'Ziyaret kaydedilemedi', details: err.message });
      }
      console.log('✅ Ziyaret kaydedildi:', ip, page_url);
      res.status(200).json({ message: 'Ziyaret kaydedildi' });
    });
  });
};

exports.getVisitStats = (req, res) => {
  console.log('📊 getVisitStats çağrıldı, headers:', req.headers);
  db.query(
    'SELECT COUNT(*) as total_visits, MIN(visit_date) as visit_day FROM visits GROUP BY DATE(visit_date)',
    (err, results) => {
      if (err) {
        console.error('❌ İstatistik hatası:', err);
        return res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
      }
      console.log('📈 Ziyaret istatistikleri:', results);
      res.status(200).json(results);
    }
  );
};