//C:\webproje\celikoglu_baklava\backend\routes\visitRoutes.js 
const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router.post('/increment', csrfProtection, visitController.incrementVisit);
router.get('/stats', visitController.getVisitStats);

module.exports = router;
