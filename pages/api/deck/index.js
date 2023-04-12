
const db = require('../../../db');
const withLogging = require('../utils/withLogging');
import InferiorRouter from '../utils/inferiorRouter';

const deckRouter = new InferiorRouter();


deckRouter.get('/', async ()=>{
    const { rows: result } = await db.query('SELECT id, title, is_favorite, is_active FROM deck WHERE player_username = $1', ['gooserjg@hotmail.com']);
    return result;
})

const handler = async (req, res) => {
    const { rows: result } = await db.query('SELECT id, title, is_favorite, is_active FROM deck WHERE player_username = $1', ['gooserjg@hotmail.com']);
    res.send(result);
}

export default withLogging(deckRouter);