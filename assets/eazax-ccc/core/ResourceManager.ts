/**
 * 资源管理器
 */
export default class ResourceManager {

    public static get resMap() { return this._resMap; }
    private static _resMap: Map<string, cc.Asset> = new Map<string, cc.Asset>();

    public static load(path: string): Promise<cc.Asset> {
        return new Promise(res => {
            const cache = this._resMap.get(path);
            if (cache) {
                return res(cache);
            }
            cc.resources.load(path, (error: Error, asset: cc.Asset) => {
                if (error) {
                    cc.log('[ResourceManager]', '加载失败', path);
                    return res(null);
                }
                this._resMap.set(path, asset);
                res(asset);
            });
        });
    }

    public static get(path: string): cc.Asset {
        return this._resMap.get(path);
    }

    public static has(path: string): boolean {
        return this._resMap.has(path);
    }

    public static release() {

    }

    public static getDepsRecursively(uuid: string): string[] {
        return cc.assetManager.dependUtil.getDepsRecursively(uuid);
    }

}
