const db = require('../../config/db');

const createLanding = async (req, res) => {
    try {
        const { payment, tiktok, instagram, number, mail, location, about_image, description, label, title, grid_images, header_img } = req.body;

        await db.execute(`DELETE FROM Landing`);

        const [result] = await db.execute(
            `INSERT INTO Landing (
                header_img, grid_images, title, label, description, about_image, location, mail, number, instagram, tiktok, payment
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                header_img, JSON.stringify(grid_images), title, label, description, about_image, location, mail, number, instagram, tiktok, payment
            ]
        );

        const product = {
            id: result.insertId,
            ...req.body
        };

        res.status(201).json({ status: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Daxili server xətası' });
    }
};

module.exports = createLanding;
