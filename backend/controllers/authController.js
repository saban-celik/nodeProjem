//C:\webproje\celikoglu_baklava\backend\controllers\authController.js
const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.registerUser = (req, res) => {
  let { name, email, password } = req.body;

  name = name.trim();
  const lowerName = name.toLowerCase();

  db.query('SELECT * FROM users WHERE email = ? OR name = ?', [email, name], async (err, results) => {
    if (err) {
      console.error('Register sorgu hatası:', err); // Hata ayıkla
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }
    if (results.length > 0) return res.status(400).json({ error: 'Bu e-posta veya kullanıcı adı zaten kayıtlı' });

    const isAdmin = lowerName === "admin" ? 1 : 0;

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, isAdmin],
      (err, result) => {
        if (err) {
          console.error('Kayıt hatası:', err); // Hata ayıkla
          return res.status(500).json({ error: 'Kayıt sırasında hata oluştu' });
        }

        db.query('SELECT id, name, email, isAdmin FROM users WHERE id = ?', [result.insertId], (err2, userResults) => {
          if (err2) {
            console.error('Kullanıcı alınamadı hatası:', err2); // Hata ayıkla
            return res.status(500).json({ error: 'Kullanıcı alınamadı' });
          }
          res.status(201).json({ user: userResults[0] });
        });
      }
    );
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Login sorgu hatası:', err); // Hata ayıkla
      return res.status(500).json({ error: 'Veritabanı hatası: ' + err.message });
    }
    if (results.length === 0) return res.status(401).json({ error: 'E-posta veya şifre hatalı' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ error: 'E-posta veya şifre hatalı' });

    res.json({
      message: 'Giriş başarılı',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: !!user.isAdmin
      }
    });
  });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;

  db.query('SELECT id, name, email, isAdmin FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Kullanıcı sorgu hatası:', err); // Hata ayıkla
      return res.status(500).json({ error: 'Veritabanı hatası' });
    }
    if (results.length === 0) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });

    res.json(results[0]);
  });
};