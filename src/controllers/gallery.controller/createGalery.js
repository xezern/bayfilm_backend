const db = require('../../config/db');

const createGalery = async (req, res) => {
    try {
        const types = ['ONE', 'TREE', 'GRID', 'FULL', 'VIDEO']
        const { type, description, title, galery } = req.body;

        if (!type || !title || !description || !galery) return res.status(400).json({ message: "type, title, description, galery mütləq göndərilməlidir" })
        if (!types.includes(type)) return res.status(400).json({ message: "type-lar yanliz bunlardir: 'ONE', 'TREE', 'GRID', 'FULL', 'VIDEO' " })

        const [result] = await db.execute(
            `INSERT INTO Galery ( type, description, title, galery ) VALUES (?, ?, ?, ?)`,
            [type, description, title, JSON.stringify(galery)]
        );

        const product = {
            id: result.insertId,
            ...req.body,
            galery: JSON.parse(galery)
        };

        res.status(201).json({ status: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Daxili server xətası' });
    }
};

module.exports = createGalery;
