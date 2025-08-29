const express = require('express');
const auth = require('../middlewares/auth.middleware');
const { getAllGalery, createGalery, updateGalery, deleteGaleryById } = require('../controllers/gallery.controller');

const router = express.Router();

router.post('/', auth, createGalery);
router.get('/', getAllGalery);
router.delete('/:id', deleteGaleryById);
router.put('/:id', updateGalery);

module.exports = router;
