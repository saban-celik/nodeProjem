//C:\webproje\celikoglu_baklava\backend\models\videoModel.js
const db = require('../config/db');

exports.getAllVideos = callback => {
  const query = `
    SELECT id, url, created_at
    FROM videos
    ORDER BY created_at DESC
  `;
  db.query(query, callback);
};

exports.getById = (id, callback) => {
  const query = `
    SELECT id, url, created_at
    FROM videos
    WHERE id = ?
  `;
  db.query(query, [id], callback);
};

exports.createVideo = (video, callback) => {
  const { url } = video;
  const query = `
    INSERT INTO videos (url)
    VALUES (?)
  `;
  db.query(query, [url], callback);
};

exports.updateVideo = (id, video, callback) => {
  const { url } = video;
  const query = `
    UPDATE videos
    SET url = ?
    WHERE id = ?
  `;
  db.query(query, [url, id], callback);
};

exports.deleteVideo = (id, callback) => {
  const query = `DELETE FROM videos WHERE id = ?`;
  db.query(query, [id], callback);
};
