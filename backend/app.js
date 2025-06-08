// 📄 C:\webproje\celikoglu_baklava\backend\app.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const videoRoutes = require('./routes/videoRoutes');
const newsRoutes = require('./routes/newsRoutes');
const announcementsRoutes = require('./routes/announcementsRoutes');
const visitRoutes = require('./routes/visitRoutes');

const app = express();

// 🔐 Middleware
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', // 🔧 FRONTEND URL'ni açık belirt
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 Statik dosyalar
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// 🔒 CSRF koruması
const csrfProtection = csrf({ cookie: true });

// 🔌 CSRF token almak için özel endpoint
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res
    .cookie('XSRF-TOKEN', req.csrfToken(), {
      httpOnly: false,
      secure: false,
      sameSite: 'lax'
    })
    .json({ csrfToken: req.csrfToken() });
});

// 📦 API route'ları
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/announcements', announcementsRoutes);
app.use('/api/visits', visitRoutes);

// 🧪 Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API çalışıyor!' });
});

// 🚀 Sunucu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});
