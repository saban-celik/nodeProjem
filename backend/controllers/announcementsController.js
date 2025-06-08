//C:\webproje\celikoglu_baklava\backend\controllers\announcementsController.js
const Announcement = require('../models/announcementsModel');

exports.getAllAnnouncements = (req, res) => {
  Announcement.getAllAnnouncements((err, results) => {
    if (err) {
      console.error('Veritabanı hatası:', err);
      return res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
    }
    res.json(results);
  });
};

exports.createAnnouncement = (req, res) => {
  const { title, content } = req.body;

  // Daha kapsamlı doğrulama
  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ 
      error: 'Başlık ve içerik alanları boş olamaz',
      details: { title: !!title, content: !!content }
    });
  }

  const announcement = { title: title.trim(), content: content.trim() }
  Announcement.createAnnouncement(announcement, (err, result) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] createAnnouncement hatası:`, err);
      return res.status(500).json({ error: 'Duyuru eklenemedi', details: err.message });
    }
    res.status(201).json({ id: result.insertId, ...announcement });
  });
};

exports.updateAnnouncement = (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Başlık ve içerik gerekli' });
  }

  const announcement = { title, content };
  Announcement.updateAnnouncement(id, announcement, (err) => {
    if (err) {
      console.error('updateAnnouncement hatası:', err);
      return res.status(500).json({ error: 'Duyuru güncellenemedi' });
    }
    res.json({ id, ...announcement });
  });
};

exports.deleteAnnouncement = (req, res) => {
  const id = req.params.id;
  Announcement.getAllAnnouncements((err, announcements) => {
    if (err) {
      console.error('Veritabanı hatası:', err);
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }
    const item = announcements.find((n) => n.id == id);
    if (!item) {
      return res.status(404).json({ error: 'Duyuru bulunamadı' });
    }

    Announcement.deleteAnnouncement(id, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Duyuru silinemedi' });
      }
      res.json({ message: 'Duyuru silindi' });
    });
  });
};