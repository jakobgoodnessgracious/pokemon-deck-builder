
export default class InferiorRouter {
    #paths;
    constructor() {
        this.#paths = {};

    }

    handle() {
        return (req,res) => {
            const {method} = req;
            console.log('method', method)
            this.#run('/', method, req, res);
        }
    }

    #getPathMethod(path, method) {
        return this.#paths[path][method.toLowerCase()];
    }

    #initPath(path) {
        if (!this.#paths[path]) {
            this.#paths[path] = {};
        }
    }

    get(path, cb) {
        this.#initPath(path);
        this.#paths[path].get = cb;
    }

    post(path, cb) {
        this.#initPath(path);
        this.#paths[path].post = cb;
    }

    put(path, cb) {
        this.#initPath(path);
        this.#paths[path].put = cb;
    }

    delete(path, cb) {
        this.#initPath(path);
        this.#paths[path].delete = cb;
    }

    #run(path, method, req, res) {
        this.#getPathMethod(path, method)(req, res);
    }
}