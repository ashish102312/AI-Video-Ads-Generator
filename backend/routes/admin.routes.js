const express = require('express');
const { getDashboardStats } = require('../controllers/admin.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

// Only admin users can access these routes
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);

module.exports = router;
