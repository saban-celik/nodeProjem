//C:\webproje\celikoglu_baklava\backend\controllers\announcementsController.js
const Announcement = require('../models/announcementsModel');

exports.getAllAnnouncements = (req, res) => {
  console.log("getAllAnnouncements çağrıldı");
  Announcement.getAllAnnouncements((err, results) => {
    if (err) {
      console.error('Veritabanı hatası:', err);
      return res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
    }
    console.log("getAllAnnouncements sonuçları:", results);
    res.json(results);
  });
};

exports.createAnnouncement = (req, res) => {
  console.log(`[${new Date().toISOString()}] createAnnouncement çağrıldı, req.body:`, req.body);
  const { title, content } = req.body;

  // Daha kapsamlı doğrulama
  if (!title?.trim() || !content?.trim()) {
    console.log(`[${new Date().toISOString()}] createAnnouncement hata: Başlık veya içerik eksik`, { title, content });
    return res.status(400).json({ 
      error: 'Başlık ve içerik alanları boş olamaz',
      details: { title: !!title, content: !!content }
    });
  }

  const announcement = { title: title.trim(), content: content.trim() };
  console.log(`[${new Date().toISOString()}] createAnnouncement işlenecek veri:`, announcement);
  Announcement.createAnnouncement(announcement, (err, result) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] createAnnouncement hatası:`, err);
      return res.status(500).json({ error: 'Duyuru eklenemedi', details: err.message });
    }
    console.log(`[${new Date().toISOString()}] createAnnouncement başarı, sonuç:`, result);
    res.status(201).json({ id: result.insertId, ...announcement });
  });
};

exports.updateAnnouncement = (req, res) => {
  console.log("updateAnnouncement çağrıldı, id:", req.params.id, "alınan veri:", req.body);
  const id = req.params.id;
  const { title, content } = req.body;

  if (!title || !content) {
    console.log("updateAnnouncement hata: Başlık ve içerik gerekli");
    return res.status(400).json({ error: 'Başlık ve içerik gerekli' });
  }

  const announcement = { title, content };
  console.log("updateAnnouncement işlenecek veri:", announcement);
  Announcement.updateAnnouncement(id, announcement, (err) => {
    if (err) {
      console.error('updateAnnouncement hatası:', err);
      return res.status(500).json({ error: 'Duyuru güncellenemedi' });
    }
    console.log("updateAnnouncement başarı, id:", id);
    res.json({ id, ...announcement });
  });
};

exports.deleteAnnouncement = (req, res) => {
  console.log("deleteAnnouncement çağrıldı, id:", req.params.id);
  const id = req.params.id;
  Announcement.getAllAnnouncements((err, announcements) => {
    if (err) {
      console.error('Veritabanı hatası:', err);
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }
    const item = announcements.find((n) => n.id == id);
    if (!item) {
      console.log("deleteAnnouncement hata: Duyuru bulunamadı, id:", id);
      return res.status(404).json({ error: 'Duyuru bulunamadı' });
    }

    console.log("deleteAnnouncement bulunamadı, silinecek id:", id);
    Announcement.deleteAnnouncement(id, (err) => {
      if (err) {
        console.error('deleteAnnouncement hatası:', err);
        return res.status(500).json({ error: 'Duyuru silinemedi' });
      }
      console.log("deleteAnnouncement başarı, id:", id);
      res.json({ message: 'Duyuru silindi' });
    });
  });
};