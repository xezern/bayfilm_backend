const db = require('../../config/db');

const getAllGalery = async (req, res) => {
    try {
        const [category] = await db.execute('SELECT * FROM Galery');
        return res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getAllGalery;
