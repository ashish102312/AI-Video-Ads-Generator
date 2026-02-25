const express = require('express');
const { createVideo, getVideos } = require('../controllers/video.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/generate', protect, createVideo);
router.get('/', protect, getVideos);

module.exports = router;
