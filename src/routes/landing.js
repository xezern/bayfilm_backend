const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const { getLanding, createLanding } = require('../controllers/landing.controllers');

router.get('/', getLanding)
router.post('/', createLanding)


module.exports = router;
