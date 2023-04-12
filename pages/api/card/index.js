
const db = require('../../../db');
const withLogging = require('../utils/withLogging');
import InferiorRouter from '../utils/inferiorRouter';
const cardRouter = new InferiorRouter();

cardRouter.get('/', async (req, res)=>{
    const { rows: result } = await db.query('SELECT * FROM card', '');
    res.status(201).send(result);
})

const handler = async (req, res) => {
    const { rows: result } = await db.query('SELECT * FROM card', '');
    res.status(201).send(result);
}

export default withLogging(cardRouter);