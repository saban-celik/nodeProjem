// C:\webproje\celikoglu_baklava\backend\models\announcementsModel.js
const db = require('../config/db');

exports.getAllAnnouncements = (callback) => {
  const query = `
    SELECT id, title, content, created_at, updated_at
    FROM announcements
    ORDER BY created_at DESC
  `;
  db.query(query, (err, results) => {
    callback(err, results);
  });
};

exports.createAnnouncement = (announcement, callback) => {
  const { title, content } = announcement;
  const query = `
    INSERT INTO announcements (title, content)
    VALUES (?, ?)
  `;
  db.query(query, [title, content], (err, result) => {
    callback(err, result);
  });
};

exports.updateAnnouncement = (id, announcement, callback) => {
  const { title, content } = announcement;
  const query = `
    UPDATE announcements
    SET title = ?, content = ?
    WHERE id = ?
  `;
  db.query(query, [title, content, id], (err) => {
    callback(err);
  });
};

exports.deleteAnnouncement = (id, callback) => {
  const query = `DELETE FROM announcements WHERE id = ?`;
  db.query(query, [id], (err) => {
    callback(err);
  });
};
