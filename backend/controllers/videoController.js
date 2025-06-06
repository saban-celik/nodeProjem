//C:\webproje\celikoglu_baklava\backend\controllers\videoController.js
const Video = require('../models/videoModel');

// Tüm videoları getir
exports.getAllVideos = (req, res) => {
  Video.getAllVideos((err, results) => {
    if (err) return res.status(500).json({ error: 'Veritabanı hatası' });
    res.json(results);
  });
};

// Yeni video ekle
exports.createVideo = (req, res) => {
  const url = req.file ? `/uploads/${req.file.filename}` : '';
  if (!url) return res.status(400).json({ error: 'Video dosyası gerekli' });

  Video.createVideo({ url }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Video eklenemedi' });
    // Yeni kaydı geri döndür
    Video.getById(result.insertId, (err2, rows) => {
      if (err2) return res.status(500).json({ error: 'Veritabanı hatası' });
      res.status(201).json(rows[0]);
    });
  });
};

// Var olan videoyu güncelle
exports.updateVideo = (req, res) => {
  const id = req.params.id;
  const url = req.file ? `/uploads/${req.file.filename}` : req.body.url;
  if (!url) return res.status(400).json({ error: 'Video dosyası gerekli' });

  Video.updateVideo(id, { url }, (err) => {
    if (err) return res.status(500).json({ error: 'Video güncellenemedi' });
    Video.getById(id, (err2, rows) => {
      if (err2) return res.status(500).json({ error: 'Veritabanı hatası' });
      res.json(rows[0]);
    });
  });
};

// Video sil
exports.deleteVideo = (req, res) => {
  const id = req.params.id;
  Video.deleteVideo(id, (err) => {
    if (err) return res.status(500).json({ error: 'Video silinemedi' });
    res.json({ message: 'Video silindi' });
  });
};
