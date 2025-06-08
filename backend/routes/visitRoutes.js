//C:\webproje\celikoglu_baklava\backend\routes\visitRoutes.js 
const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// ❗ Sadece stats için CSRF aktif, POST için kaldırıldı
router.post('/increment', visitController.incrementVisit);
router.get('/stats', csrfProtection, visitController.getVisitStats);

module.exports = router;
