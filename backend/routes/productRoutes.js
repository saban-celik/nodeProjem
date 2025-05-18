// C:\webproje\celikoglu_baklava\backend\routes\productRoutes.js
const express = require('express');
const router = express.Router();
const {
    getBaklavaProducts,
    getRegionalProducts,
    getBaklavaCategories,
    getRegionalCategories
} = require('../controllers/productController');

// Ürünler
router.get('/baklava-products', getBaklavaProducts);
router.get('/regional-products', getRegionalProducts);

// Kategoriler
router.get('/baklava-categories', getBaklavaCategories);
router.get('/regional-categories', getRegionalCategories);

module.exports = router;
