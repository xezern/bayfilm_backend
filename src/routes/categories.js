const express = require('express');
const {
    createCategory,
    getCategories,
    deleteCategoryById,
} = require('../controllers/categories.controllers');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', auth, createCategory);
router.get('/', getCategories);
router.delete('/:id', deleteCategoryById);

module.exports = router;
