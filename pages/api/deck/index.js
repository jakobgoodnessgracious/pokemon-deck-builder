
const db = require('../../../db');
const withLogging = require('../utils/withLogging');

// class Router {
//     constructor() {
//         this._paths = {};
//     }

//     _initPath(path) {
//         if (!this._paths[path]) {
//             this._paths[path] = {};
//         }
//     }

//     get(path, cb) {
//         this._initPath(path);
//         this._paths[path].get = cb;
//     }

//     post(path, cb) {
//         this._initPath(path);
//         this._paths[path].post = cb;
//     }

//     put(path, cb) {
//         this._initPath(path);
//         this._paths[path].put = cb;
//     }

//     delete(path, cb) {
//         this._initPath(path);
//         this._paths[path].delete = cb;
//     }

//     run(req) {
//     }
// }
// const deckRouter = new Router();
// const next = {Router: () => {
//     return {
//         get:(path, cb) => {},
//         put: (func) => (req, res) => func(req, res),
//         delete: (func) => (req, res) => func(req, res),
//         post: (func) => (req, res) => func(req, res)
//     }
// }};

// deckRouter.get('/', async ()=>{
//     const { rows: result } = await db.query('SELECT id, title, is_favorite, is_active FROM deck WHERE player_username = $1', ['gooserjg@hotmail.com']);
//     return result;
// })

// export default async (req, res) => {
//     const { rows: result } = await db.query('SELECT id, title, is_favorite, is_active FROM deck WHERE player_username = $1', ['gooserjg@hotmail.com']);
//     res.send(result);
// }


// const withLogging = (handler) => {
//     return async (req, res) => {
//         const temp = res.send;
//         res.send = (result) => {
//             console.log('result', result);
//             temp.call(this, result);
//         }
//         await handler(req, res);
//     }
// }

const handler = async (req, res) => {
    const { rows: result } = await db.query('SELECT id, title, is_favorite, is_active FROM deck WHERE player_username = $1', ['gooserjg@hotmail.com']);
    res.send(result);
}

export default withLogging(handler);