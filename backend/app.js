// C:\webproje\celikoglu_baklava\backend\app.js

const express = require('express');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const videoRoutes = require('./routes/videoRoutes');
const newsRoutes = require('./routes/newsRoutes');
const announcementsRoutes = require('./routes/announcementsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik dosya yolu
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// API Route'ları
if (authRoutes && typeof authRoutes === 'function') {
  app.use('/api/auth', authRoutes);
}
if (productRoutes && typeof productRoutes === 'function') {
  app.use('/api/products', productRoutes);
}
if (videoRoutes && typeof videoRoutes === 'function') {
  app.use('/api/videos', videoRoutes);
}
if (newsRoutes && typeof newsRoutes === 'function') {
  app.use('/api/news', newsRoutes);
}
if (announcementsRoutes && typeof announcementsRoutes === 'function') {
  app.use('/api/announcements', announcementsRoutes);
}

// Basit test endpoint'i
app.get("/api/test", (req, res) => {
  res.json({ message: "API çalışıyor!" });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});