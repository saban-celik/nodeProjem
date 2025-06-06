//C:\webproje\celikoglu_baklava\backend\models\newsModel.js
const db = require('../config/db');

exports.getAllNews = (callback) => {
  const query = `
    SELECT id, title, content, image, created_at, updated_at
    FROM news
    ORDER BY created_at DESC
  `;
  db.query(query, callback);
};

exports.createNews = (news, callback) => {
  const { title, content, image } = news;
  const query = `
    INSERT INTO news (title, content, image)
    VALUES (?, ?, ?)
  `;
  db.query(query, [title, content, image], callback);
};

exports.updateNews = (id, news, callback) => {
  const { title, content, image } = news;
  const query = `
    UPDATE news
    SET title = ?, content = ?, image = ?
    WHERE id = ?
  `;
  db.query(query, [title, content, image, id], callback);
};

exports.deleteNews = (id, callback) => {
  const query = `DELETE FROM news WHERE id = ?`;
  db.query(query, [id], callback);
};
