const db = require('../../config/db');

const createGalery = async (req, res) => {
    try {
        const types = ['ONE', 'TREE', 'GRID', 'FULL', 'VIDEO']
        const { type, description, title, galery } = req.body;

        if (!type || !title || !description || !galery) return res.status(400).json({ message: "type, title, description, galery mütləq göndərilməlidir" })
        if (!types.includes(type)) return res.status(400).json({ message: "type-lar yanliz bunlardir: 'ONE', 'TREE', 'GRID', 'FULL', 'VIDEO' " })

        if (type === 'ONE' && galery.length != 1) return res.status(400).json({ message: "Type 'ONE' olduqda yalnız bir şəkil göndərilməlidir!" })
        if (type === 'TREE' && galery.length != 3) return res.status(400).json({ message: "Type 'TREE' olduqda üç ədəd şəkil göndərilməlidir!" })
        if (type === 'GRID' && galery.length != 4) return res.status(400).json({ message: "Type 'GRID' olduqda dörd ədəd şəkil göndərilməlidir!" })
        if (type === 'FULL' && galery.length != 1) return res.status(400).json({ message: "Type 'FULL' olduqda yalnız bir şəkil göndərilməlidir!" })
        if (type === 'VIDEO' && galery.length != 1) return res.status(400).json({ message: "Type 'VIDEO' olduqda yalnız bir video url göndərilməlidir!" })

        const imgs = JSON.stringify(galery)

        const [result] = await db.execute(
            'INSERT INTO Galery (type, description, title, galery) VALUES (?, ?, ?, ?)',
            [type || '', description || '', title || '', imgs || '[]']
        );
        const product = {
            id: result.insertId,
            ...req.body,
            galery
        };

        res.status(201).json({ status: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Daxili server xətası' });
    }
};

module.exports = createGalery;
