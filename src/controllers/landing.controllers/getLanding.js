const db = require('../../config/db');

async function getLanding(req, res) {
    try {
        const [landing] = await db.execute('SELECT * FROM Landing');
        console.log(landing);
        
        return res.status(200).json(landing)

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = getLanding