//C:\webproje\celikoglu_baklava\backend\controllers\visitController.js
const db = require('../config/db');

exports.incrementVisit = (req, res) => {
  const { page_url } = req.body;
  console.log(`incrementVisit çağrıldı, page_url: ${page_url}`); // Hata ayıklama

  db.query(
    'INSERT INTO visits (page_url) VALUES (?)',
    [page_url || '/'],
    (err, result) => {
      if (err) {
        console.error('Ziyaret kaydedilemedi:', err);
        return res.status(500).json({ error: 'Ziyaret kaydedilemedi', details: err.message });
      }
      console.log('Ziyaret kaydedildi, insertId:', result.insertId); // Başarı logu
      res.status(200).json({ message: 'Ziyaret kaydedildi' });
    }
  );
};

exports.getVisitStats = (req, res) => {
  console.log('getVisitStats çağrıldı, headers:', req.headers);
  db.query(
    'SELECT COUNT(*) as total_visits, DATE(visit_date) as visit_day FROM visits GROUP BY DATE(visit_date)',
    (err, results) => {
      if (err) {
        console.error('Ziyaret istatistikleri alınamadı:', err);
        return res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
      }
      console.log('Ziyaret istatistikleri:', results);
      res.status(200).json(results);
    }
  );
};