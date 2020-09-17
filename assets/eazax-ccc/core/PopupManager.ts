import PopupBase from "../components/popup/PopupBase";

/** 弹窗管理器 */
export default class PopupManager {

    /** 预制体 */
    private static prefabMap: Map<string, cc.Prefab> = new Map<string, cc.Prefab>();

    /** 节点 */
    private static nodeMap: Map<string, cc.Node> = new Map<string, cc.Node>();

    /** 队列 */
    public static get queue() { return this._queue; }
    private static _queue: Request[] = [];

    /** 当前弹窗 */
    private static _curPopup: string = null;

    /**
     * 展示弹窗
     * @param path 
     * @param options 
     * @param mode 
     */
    public static async show(path: string, options: object = null, mode: PopupMode = PopupMode.Temporary) {
        if (this._curPopup) {
            this._queue.push({ path, options, mode });
            cc.log('[PopupManager]', '弹窗已加入等待队列', this._queue);
            return;
        }
        this._curPopup = path;

        let node: cc.Node;
        if (this.prefabMap.has(path)) {
            const prefab = this.prefabMap.get(path);
            if (cc.isValid(prefab)) node = cc.instantiate(prefab);
            else this.prefabMap.delete(path);
        } else if (this.nodeMap.has(path)) {
            node = this.nodeMap.get(path);
            if (!cc.isValid(node)) this.nodeMap.delete(path);
        }

        if (!cc.isValid(node)) {
            await new Promise(res => {
                cc.resources.load(path, (error: Error, prefab: cc.Prefab) => {
                    if (!error) node = cc.instantiate(prefab);
                    res();
                });
            });
        }

        if (!cc.isValid(node)) {
            this._curPopup = null;
            cc.warn('[PopupManager]', '弹窗加载失败', path);
            return;
        }

        node.setParent(cc.Canvas.instance.node);
        const popup = node.getComponent(PopupBase);
        if (!popup) return;
        popup.setFinishedCallback(() => {
            this._curPopup = null;
            this.next();
        });
        popup.show(options);
    }

    /** 下一个弹窗 */
    public static next() {
        if (this._curPopup || this._queue.length === 0) return;
        const request = this._queue.shift();
        this.show(request.path, request.options, request.mode);
    }

}

interface Request {
    path: string;
    options: object;
    mode: PopupMode,
}

export enum PopupMode {
    /** 一次性（立即销毁，不保留预制体） */
    OneTime = 1,
    /** 偶尔（立即销毁，保留预制体） */
    Temporary,
    /** 频繁（关闭节点，保留预制体） */
    Frequent
}
