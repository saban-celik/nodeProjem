//C:\webproje\celikoglu_baklava\backend\routes\newsRoutes.js
const express = require('express');
const router = express.Router();
const { getAllNews, createNews, updateNews, deleteNews } = require('../controllers/newsController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Sadece resim veya video yüklenebilir'), false);
    }
  },
});

router.get('/', getAllNews);
router.post('/', upload.single('media'), createNews);
router.put('/:id', upload.single('media'), updateNews);
router.delete('/:id', deleteNews);

module.exports = router;
