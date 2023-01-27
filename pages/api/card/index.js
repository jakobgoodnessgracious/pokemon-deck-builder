
const db = require('../../../db');
const withLogging = require('../utils/withLogging');

const handler = async (req, res) => {
    const { rows: result } = await db.query('SELECT * FROM card', '');
    res.status(201).send(result);
}

export default withLogging(handler);