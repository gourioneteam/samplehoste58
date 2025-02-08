const express = require('express');
const { auth, adminOnly } = require('../middleware/auth');
const { getAllStudents, getProfile } = require('../controllers/usercontrollers');
const router = express.Router();

router.get('/students', auth, adminOnly, getAllStudents);
router.get('/profile', auth, getProfile);

module.exports = router;