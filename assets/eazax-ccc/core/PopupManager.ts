import PopupBase from "../components/popup/PopupBase";

/** 弹窗管理器 */
export default class PopupManager {

    /** 预制表 */
    private static prefabMap: Map<string, cc.Prefab> = new Map<string, cc.Prefab>();

    /** 节点表 */
    private static nodeMap: Map<string, cc.Node> = new Map<string, cc.Node>();

    /** 等待队列 */
    public static get queue() { return this._queue; }
    private static _queue: PopupRequest[] = [];

    /** 当前弹窗路径 */
    private static _curPopup: string = null;

    /**
     * 展示弹窗
     * @param path 相对路径（如：prefabs/popup）
     * @param options 选项
     * @param mode 回收模式
     */
    public static async show(path: string, options: object = null, mode: PopupRecycleMode = PopupRecycleMode.Temporary) {
        if (this._curPopup) {
            this._queue.push({ path, options, mode });
            cc.log('[PopupManager]', '弹窗已加入等待队列', this._queue);
            return;
        }
        this._curPopup = path;

        let node: cc.Node = null;
        let curMode: PopupRecycleMode = null;
        if (this.prefabMap.has(path)) {
            // 从预制表中获取
            const prefab = this.prefabMap.get(path);
            if (cc.isValid(prefab)) node = cc.instantiate(prefab);
            else this.prefabMap.delete(path);
            curMode = PopupRecycleMode.Temporary;
        } else if (this.nodeMap.has(path)) {
            // 从节点表中获取
            node = this.nodeMap.get(path);
            if (!cc.isValid(node)) this.nodeMap.delete(path);
            curMode = PopupRecycleMode.Frequent;
        }

        if (!cc.isValid(node)) {
            // 重新动态加载
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
        node.setSiblingIndex(999);
        const popup = node.getComponent(PopupBase);
        if (!popup) return (node.active = true);
        popup.setFinishedCallback(() => {
            this._curPopup = null;
            this.recycle(path, node, mode);
            this.next();
        });
        popup.show(options);
    }

    private static recycle(path: string, node: cc.Node, mode: PopupRecycleMode) {
        switch (mode) {
            case PopupRecycleMode.OneTime:

                break;
            case PopupRecycleMode.Temporary:

                break;
            case PopupRecycleMode.Frequent:
                this.nodeMap.set(path, node);
                node.removeFromParent(false);
                break;
        }
    }

    /** 下一个弹窗 */
    public static next() {
        if (this._curPopup || this._queue.length === 0) return;
        const request = this._queue.shift();
        this.show(request.path, request.options, request.mode);
    }

}

/** 弹窗请求 */
interface PopupRequest {
    /** 路径 */
    path: string;
    /** 弹窗选项 */
    options: object;
    /** 优化模式 */
    mode: PopupRecycleMode,
}

/** 弹窗回收模式 */
export enum PopupRecycleMode {
    /** 一次性（立即销毁，不保留预制体） */
    OneTime = 1,
    /** 偶尔（立即销毁，保留预制体） */
    Temporary,
    /** 频繁（关闭节点，保留预制体） */
    Frequent
}
