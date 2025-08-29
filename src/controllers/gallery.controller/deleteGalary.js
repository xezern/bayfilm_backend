const db = require('../../config/db');
const fs = require('fs');
const path = require('path');

const deleteGaleryById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const [rows] = await db.execute('SELECT * FROM Galery WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Galery not found' });
        }

        const product = rows[0];
        const imgs = JSON.parse(product.img);

        if (imgs && imgs.length > 0) {
            for (const imageUrl of imgs) {
                const filename = imageUrl.split('/').pop();
                const filePath = path.join(__dirname, '..', '..', '..', 'uploads', filename);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        }

        await db.execute('DELETE FROM Galery WHERE id = ?', [id]);

        res.status(200).json({
            message: 'Galery deleted successfully',
            galery: product
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = deleteGaleryById