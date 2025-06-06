//C:\webproje\celikoglu_baklava\backend\routes\announcementsRoutes.js
const express = require('express');
const router = express.Router();
const { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementsController');

router.get('/', getAllAnnouncements);
router.post('/', createAnnouncement);
router.put('/:id', updateAnnouncement);
router.delete('/:id', deleteAnnouncement);

module.exports = router;