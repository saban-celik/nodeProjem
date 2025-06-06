// C:\webproje\celikoglu_baklava\backend\routes\productRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

// 🔸 Yükleme yapılandırması
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + Date.now() + ext;
    cb(null, name);
  }
});
const upload = multer({ storage });

// ✅ Baklava ürünleri
router.get('/baklava-products', controller.getBaklavaProducts);
router.get('/simple-baklava-products', controller.getSimpleBaklavaProducts);
router.post('/baklava-products', upload.single('image'), controller.createBaklavaProduct);
router.put('/baklava-products/:id', upload.single('image'), controller.updateBaklavaProduct);
router.delete('/baklava-products/:id', controller.deleteBaklavaProduct);

// ✅ Yöresel ürünler
router.get('/regional-products', controller.getRegionalProducts);
router.post('/regional-products', upload.single('image'), controller.createRegionalProduct);
router.put('/regional-products/:id', upload.single('image'), controller.updateRegionalProduct);
router.delete('/regional-products/:id', controller.deleteRegionalProduct);

// 🔚 Export router
module.exports = router;
