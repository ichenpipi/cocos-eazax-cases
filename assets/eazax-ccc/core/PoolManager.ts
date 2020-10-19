export default class PoolManager {

    public static get poolMap() { return this._poolMap }
    private static _poolMap: Map<string, cc.NodePool> = new Map<string, cc.NodePool>();

    public static get prefabMap() { return this._prefabMap }
    private static _prefabMap: Map<string, cc.Prefab> = new Map<string, cc.Prefab>();

    public static async get(path: string): Promise<cc.Node> {
        const pool = this._poolMap.get(path);
        if (pool && pool.size() > 0) {
            return pool.get();
        } else if (this._prefabMap.has(path)) {
            return cc.instantiate(this._prefabMap.get(path));
        }
        const node = await this.getFromRes(path);
        return (node ? node : null);
    }

    public static put(path: string, node: cc.Node): void {
        let pool = this._poolMap.get(path);
        if (!pool) {
            pool = new cc.NodePool();
            this._poolMap.set(path, pool);
        }
        pool.put(node);
    }

    public static getFromRes(path: string): Promise<cc.Node> {
        return new Promise(res => {
            cc.resources.load(path, (error: Error, prefab: cc.Prefab) => {
                if (!error) {
                    prefab.addRef();
                    this._prefabMap.set(path, prefab);
                    res(cc.instantiate(prefab));
                } else {
                    res(null);
                }
            });
        });
    }

}
