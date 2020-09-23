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

    /** 当前弹窗 */
    public static get curPopup() { return this._curPopup; }
    private static _curPopup: PopupRequest = null;

    /**
     * 展示弹窗
     * @param path 弹窗预制体相对路径（如：prefabs/popup）
     * @param options 弹窗选项
     * @param mode 回收模式
     */
    public static async show(path: string, options: any = null, mode: PopupRecycleMode = PopupRecycleMode.Temporary): Promise<boolean> {
        const request = { path, options, mode };
        if (this._curPopup) {
            this._queue.push(request);
            cc.log('[PopupManager]', '弹窗已加入等待队列', this._queue);
            return false;
        }

        return new Promise(async res => {
            this._curPopup = request;

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
                        if (!error) {
                            node = cc.instantiate(prefab);
                            this.prefabMap.set(path, prefab);
                        }
                        res();
                    });
                });
            }

            if (!cc.isValid(node)) {
                this._curPopup = null;
                cc.warn('[PopupManager]', '弹窗加载失败', path);
                return res(false);
            }

            node.setParent(cc.Canvas.instance.node);
            node.setSiblingIndex(cc.macro.MAX_ZINDEX);

            const popup = node.getComponent(PopupBase);
            if (popup) {
                popup.setFinishedCallback(() => {
                    this._curPopup = null;
                    res(true);
                    this.recycle(path, node, mode);
                    this.next();
                });
                popup.show(options);
            } else {
                // 没有 PopupBase 组件则直接打开节点
                node.active = true;
                res(true);
            }
        });

    }

    /**
     * 展示等待队列中的下一个弹窗
     */
    public static next() {
        if (this._curPopup || this._queue.length === 0) return;
        const request = this._queue.shift();
        this.show(request.path, request.options, request.mode);
    }

    /**
     * 回收弹窗
     * @param path 路径
     * @param node 节点
     * @param mode 模式
     */
    private static recycle(path: string, node: cc.Node, mode: PopupRecycleMode) {
        switch (mode) {
            case PopupRecycleMode.OneTime:
                node.destroy();
                break;
            case PopupRecycleMode.Temporary:
                node.destroy();
                break;
            case PopupRecycleMode.Frequent:
                this.nodeMap.set(path, node);
                node.removeFromParent(false);
                break;
        }
    }

    /**
     * 释放弹窗以及资源
     * @param path 
     */
    private release(path: string) {

    }

}

/** 弹窗请求 */
interface PopupRequest {
    /** 弹窗预制体相对路径 */
    path: string;
    /** 弹窗选项 */
    options: any;
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
