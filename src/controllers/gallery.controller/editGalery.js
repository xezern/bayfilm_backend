const fs = require('fs');
const path = require('path');
const db = require('../../config/db');

const updateGalery = async (req, res) => {
    try {
        const types = ['ONE', 'TREE', 'GRID', 'FULL', 'VIDEO']
        const { id } = req.params;
        const { type, description, title, galery } = req.body;

        if (!id) return res.status(400).json({ message: "id mütləq göndərilməlidir" });
        if (!type || !title || !description || !galery) return res.status(400).json({ message: "type, title, description, galery mütləq göndərilməlidir" });
        if (!types.includes(type)) return res.status(400).json({ message: "type-lar yanliz bunlardir: 'ONE', 'TREE', 'GRID', 'FULL', 'VIDEO' " });

        if (type === 'ONE' && galery.length != 1) return res.status(400).json({ message: "Type 'ONE' olduqda yalnız bir şəkil göndərilməlidir!" });
        if (type === 'TREE' && galery.length != 3) return res.status(400).json({ message: "Type 'TREE' olduqda üç ədəd şəkil göndərilməlidir!" });
        if (type === 'GRID' && galery.length != 4) return res.status(400).json({ message: "Type 'GRID' olduqda dörd ədəd şəkil göndərilməlidir!" });
        if (type === 'FULL' && galery.length != 1) return res.status(400).json({ message: "Type 'FULL' olduqda yalnız bir şəkil göndərilməlidir!" });
        if (type === 'VIDEO' && galery.length != 1) return res.status(400).json({ message: "Type 'VIDEO' olduqda yalnız bir video url göndərilməlidir!" });

        if (type !== 'VIDEO') {
            const [rows] = await db.execute('SELECT galery FROM Galery WHERE id = ?', [id]);
            if (rows.length === 0) return res.status(404).json({ message: "Galery tapılmadı" });

            const oldGalery = JSON.parse(rows[0].galery || '[]');

            const removedImages = oldGalery.filter(img => !galery.includes(img));

            removedImages.forEach(imgUrl => {
                const filename = path.basename(imgUrl);
                const filePath = path.join(__dirname, '..', '..', '..', 'uploads', filename);
                try {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                        console.log(`Silindi: ${filename}`);
                    } else {
                        console.warn(`Tapılmadı: ${filename}`);
                    }
                } catch (err) {
                    console.error(`Şəkil silinərkən xəta: ${filename}`, err);
                }
            });

        }

        // Yeni galery-ni update et
        const [result] = await db.execute(
            'UPDATE Galery SET type = ?, description = ?, title = ?, galery = ? WHERE id = ?',
            [type || '', description || '', title || '', galery ? JSON.stringify(galery) : '[]', id]
        );

        const updatedProduct = { id, type, description, title, galery };
        res.status(200).json({ status: true, product: updatedProduct });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Daxili server xətası' });
    }
};

module.exports = updateGalery;
