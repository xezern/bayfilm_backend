const db = require('../../config/db');

async function getLanding(req, res) {
    try {
        const [landing] = await db.execute('SELECT * FROM Landing');

        const landings = landing.map(item => ({
            ...item,
            grid_images: JSON.parse(item.grid_images)
        }))

        return res.status(200).json(landings)

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = getLanding