const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { getAllGalery, createGalery} = require('../controllers/gallery.controller');

const router = express.Router();

router.post('/', auth, createGalery);
router.get('/', getAllGalery);
// router.delete('/:id', deleteCategoryById);

module.exports = router;
