const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth.middleware');
const { getLanding, createLanding } = require('../controllers/landing.controllers');

router.get('/', auth, getLanding)
router.post('/', auth, createLanding)


module.exports = router;
