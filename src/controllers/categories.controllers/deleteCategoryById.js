const db = require('../../config/db');
const { z } = require('zod');
const fs = require('fs');
const path = require('path');

const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id mutleq göndərilməlidir!" })

    const [rows] = await db.execute('SELECT * FROM Category WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const category = rows[0];
    const imgs = category.image

    const filename = imgs.split('/').pop();
    console.log(filename);

    const filePath = path.join(__dirname, '..', '..', '..', 'uploads', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await db.execute('DELETE FROM Category WHERE id = ?', [id]);

    res.status(200).json({
      deletecat: { ...category },
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteCategoryById;
