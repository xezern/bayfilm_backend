const db = require('../../config/db');

const getCategories = async (req, res) => {
    try {
        const [category] = await db.execute('SELECT * FROM Category');
        return res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getCategories;
