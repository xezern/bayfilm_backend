const db = require('../../config/db');

const createLanding = async (req, res) => {
  try {
    const { image, title } = req.body;
    if (!image || !title) return res.status(400).json({ message: "image ve ya title mütləq göndərilməlidir" })

    const [result] = await db.execute(
      `INSERT INTO Category (
                image, title
            ) VALUES (?, ?)`,
      [
        title, image
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
