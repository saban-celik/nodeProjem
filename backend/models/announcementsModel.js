//C:\webproje\celikoglu_baklava\backend\models\announcementsModel.js
const db = require('../config/db');

exports.getAllAnnouncements = (callback) => {
  console.log("getAllAnnouncements sorgu çalıştırılıyor");
  const query = `
    SELECT id, title, content, created_at, updated_at
    FROM announcements
    ORDER BY created_at DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("getAllAnnouncements sorgu hatası:", err);
    } else {
      console.log("getAllAnnouncements sorgu sonucu:", results);
    }
    callback(err, results);
  });
};

exports.createAnnouncement = (announcement, callback) => {
  console.log("createAnnouncement sorgu çalıştırılıyor, veri:", announcement);
  const { title, content } = announcement;
  const query = `
    INSERT INTO announcements (title, content)
    VALUES (?, ?)
  `;
  db.query(query, [title, content], (err, result) => {
    if (err) {
      console.error("createAnnouncement sorgu hatası:", err);
    } else {
      console.log("createAnnouncement sorgu sonucu:", result);
    }
    callback(err, result);
  });
};

exports.updateAnnouncement = (id, announcement, callback) => {
  console.log("updateAnnouncement sorgu çalıştırılıyor, id:", id, "veri:", announcement);
  const { title, content } = announcement;
  const query = `
    UPDATE announcements
    SET title = ?, content = ?
    WHERE id = ?
  `;
  db.query(query, [title, content, id], (err) => {
    if (err) {
      console.error("updateAnnouncement sorgu hatası:", err);
    } else {
      console.log("updateAnnouncement sorgu başarı, id:", id);
    }
    callback(err);
  });
};

exports.deleteAnnouncement = (id, callback) => {
  console.log("deleteAnnouncement sorgu çalıştırılıyor, id:", id);
  const query = `DELETE FROM announcements WHERE id = ?`;
  db.query(query, [id], (err) => {
    if (err) {
      console.error("deleteAnnouncement sorgu hatası:", err);
    } else {
      console.log("deleteAnnouncement sorgu başarı, id:", id);
    }
    callback(err);
  });
};