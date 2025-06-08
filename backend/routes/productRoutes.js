// C:\webproje\celikoglu_baklava\backend\routes\productRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + Date.now() + ext;
    cb(null, name);
  }
});
const upload = multer({ storage });

router.post('/baklava-products', csrfProtection, upload.single('image'), controller.createBaklavaProduct);
router.get('/baklava-products', controller.getBaklavaProducts); // 🔥 Yeni eklenen rota
router.get('/baklava-products/slug/:slug', controller.getBaklavaProductBySlug);
router.get('/simple-baklava-products', controller.getSimpleBaklavaProducts);
router.put('/baklava-products/:id', csrfProtection, upload.single('image'), controller.updateBaklavaProduct);
router.delete('/baklava-products/:id', csrfProtection, controller.deleteBaklavaProduct);

router.get('/regional-products', controller.getRegionalProducts);
router.post('/regional-products', csrfProtection, upload.single('image'), controller.createRegionalProduct);
router.put('/regional-products/:id', csrfProtection, upload.single('image'), controller.updateRegionalProduct);
router.delete('/regional-products/:id', csrfProtection, controller.deleteRegionalProduct);

module.exports = router;