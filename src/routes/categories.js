const express = require('express');
const {
    createCategory,
    getCategories,
} = require('../controllers/categories.controllers');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', auth, createCategory);
router.get('/', getCategories);

module.exports = router;
