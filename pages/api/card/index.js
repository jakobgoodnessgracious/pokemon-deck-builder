
const db = require('../../../db');
const withLogging = require('../utils/withLogging');

const handler = async (req, res) => {
    const { rows: result } = await db.query('SELECT * FROM card', '');
    res.send(result);
}

export default withLogging(handler);