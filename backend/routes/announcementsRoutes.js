//C:\webproje\celikoglu_baklava\backend\routes\announcementsRoutes.js
const express = require('express');
const router = express.Router();
const { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementsController');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router.get('/', getAllAnnouncements);
router.post('/', csrfProtection, createAnnouncement);
router.put('/:id', csrfProtection, updateAnnouncement);
router.delete('/:id', csrfProtection, deleteAnnouncement);

module.exports = router;
