//C:\webproje\celikoglu_baklava\backend\controllers\newsController.js
const News = require('../models/newsModel');
const fs = require('fs');
const path = require('path');

exports.getAllNews = (req, res) => {
  News.getAllNews((err, results) => {
    if (err) return res.status(500).json({ error: 'Veritabanı hatası' });
    res.json(results);
  });
};

exports.createNews = (req, res) => {
  const { title, content } = req.body;
  const mediaPath = req.file ? `/uploads/${req.file.filename}` : '';

  if (!title || !content || !mediaPath) {
    return res.status(400).json({ error: 'Tüm alanlar gerekli' });
  }

  const news = { title, content, image: mediaPath };
  News.createNews(news, (err, result) => {
    if (err) return res.status(500).json({ error: 'Haber eklenemedi' });
    res.status(201).json({ id: result.insertId, ...news });
  });
};

exports.updateNews = (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Başlık ve içerik gerekli' });
  }

  const mediaPath = req.file ? `/uploads/${req.file.filename}` : req.body.image || req.body.media || '';

  const news = { title, content, image: mediaPath };

  News.updateNews(id, news, (err) => {
    if (err) return res.status(500).json({ error: 'Haber güncellenemedi' });
    res.json({ id, ...news });
  });
};

exports.deleteNews = (req, res) => {
  const id = req.params.id;
  News.getAllNews((err, news) => {
    if (err) return res.status(500).json({ error: 'Veritabanı hatası' });
    const item = news.find((n) => n.id == id);
    if (!item) return res.status(404).json({ error: 'Haber bulunamadı' });

    if (item.image) {
      const filePath = path.join(__dirname, '../public', item.image);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Dosya silme hatası:', err);
      });
    }

    News.deleteNews(id, (err) => {
      if (err) return res.status(500).json({ error: 'Haber silinemedi' });
      res.json({ message: 'Haber silindi' });
    });
  });
};
