//C:\webproje\celikoglu_baklava\backend\routes\videoRoutes.js
const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const {
  getAllVideos,
  createVideo,
  updateVideo,
  deleteVideo
} = require('../controllers/videoController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) cb(null, true);
    else cb(new Error('Sadece video dosyaları yüklenebilir'), false);
  },
});

router.get('/', getAllVideos);
router.post('/', csrfProtection, upload.single('media'), createVideo);
router.put('/:id', csrfProtection, upload.single('media'), updateVideo);
router.delete('/:id', csrfProtection, deleteVideo);

module.exports = router;
