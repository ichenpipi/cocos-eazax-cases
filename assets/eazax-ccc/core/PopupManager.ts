import PopupBase from "../components/popups/PopupBase";

/**
 * 弹窗管理器
 * @see PopupManager.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/core/PopupManager.ts
 */
export default class PopupManager {

    /** 预制体表 */
    public static get prefabMap() { return this._prefabMap; }
    private static _prefabMap: Map<string, cc.Prefab> = new Map<string, cc.Prefab>();

    /** 节点表 */
    public static get nodeMap() { return this._nodeMap; }
    private static _nodeMap: Map<string, cc.Node> = new Map<string, cc.Node>();

    /** 等待队列 */
    public static get queue() { return this._queue; }
    private static _queue: PopupRequest[] = [];

    /** 当前展示中的弹窗请求 */
    public static get curRequest() { return this._curRequest; }
    private static _curRequest: PopupRequest = null;

    /** 当前展示中的弹窗组件 */
    private static _curPopup: PopupBase<any> = null;

    /** 当前展示中的弹窗节点 */
    private static _curNode: cc.Node = null;

    /** 锁定状态（是否已有候选弹窗） */
    private static locked: boolean = false;

    /** 连续展示弹窗的时间间隔（秒） */
    public static interval: number = 0.1;

    /** 弹窗动态加载开始回调 */
    public static loadStartCallback: Function = null;

    /** 弹窗动态加载结束回调 */
    public static loadFinishCallback: Function = null;

    /**
     * 展示弹窗，如果当前已有弹窗在展示中则加入等待队列
     * @param pathOrPrefab 弹窗预制体相对路径（如：prefabs/MyPopup）或预制体资源（不支持缓存模式和自动释放）
     * @param options 弹窗选项
     * @param mode 缓存模式
     * @param priority 优先级
     * @example 
     * const options = {
     *     title: 'Hello',
     *     content: 'How are you?'
     * }
     * PopupManager.show('prefabs/GreetPopup', options, PopupCacheMode.Once);
     */
    public static show<Options>(pathOrPrefab: string | cc.Prefab, options: Options = null, mode: PopupCacheMode = PopupCacheMode.Normal, priority: PopupShowPriority = PopupShowPriority.None): Promise<PopupShowResult> {
        return new Promise(async res => {
            // 当前已有弹窗在展示中
            if (this._curRequest || this.locked) {
                if (priority === PopupShowPriority.Immediately) {
                    // 立即展示目标弹窗
                    if (this._curPopup) {
                        // 强制关闭当前弹窗
                        this._curPopup.hide();
                    } else {
                        // 没有组件直接关闭并销毁
                        this._curNode.active = false;
                        this._curNode.destroy();
                        this._curNode = null;
                    }
                } else {
                    // 则加入等待队列
                    this.push(pathOrPrefab, options, mode, priority);
                    return res(PopupShowResult.Wait);
                }
            }

            // 保存为当前弹窗，阻止新的弹窗请求
            this._curRequest = { pathOrPrefab, options, mode };

            if (typeof pathOrPrefab === 'string') {
                // 先在缓存中获取
                this._curNode = this.getNodeFromCache(pathOrPrefab);

                // 缓存中没有，动态加载预制体资源
                if (!cc.isValid(this._curNode)) {
                    // 建议在动态加载时添加加载提示并屏蔽用户点击，避免多次点击，如下：
                    // PopupManager.loadStartCallback = () => {
                    //     LoadingTip.show();
                    // }
                    this.loadStartCallback && this.loadStartCallback();
                    // 等待加载
                    await new Promise(res => {
                        cc.resources.load(pathOrPrefab, (error: Error, prefab: cc.Prefab) => {
                            if (!error) {
                                this._curNode = cc.instantiate(prefab);      // 实例化节点
                                prefab.addRef();                    // 增加引用计数
                                this._prefabMap.set(pathOrPrefab, prefab);  // 保存预制体
                            }
                            res();
                        });
                    });
                    // 加载完成后隐藏加载提示，如下：
                    // PopupManager.loadFinishCallback = () => {
                    //     LoadingTip.hide();
                    // }
                    this.loadFinishCallback && this.loadFinishCallback();
                }

                // 加载失败（一般是路径错误导致的）
                if (!cc.isValid(this._curNode)) {
                    cc.warn('[PopupManager]', '弹窗加载失败', pathOrPrefab);
                    this._curRequest = null;
                    return res(PopupShowResult.Fail);
                }
            } else {
                // 预制体资源会直接实例化
                this._curNode = cc.instantiate(pathOrPrefab);
            }

            // 添加到场景中
            this._curNode.setParent(cc.Canvas.instance.node);
            // 显示在最上层
            this._curNode.setSiblingIndex(cc.macro.MAX_ZINDEX);

            // 获取继承自 PopupBase 的弹窗组件
            this._curPopup = this._curNode.getComponent(PopupBase);
            if (this._curPopup) {
                // 设置完成回调
                this._curPopup.setFinishCallback(async () => {
                    this.recycle(pathOrPrefab, this._curNode, mode);
                    this.locked = (this._queue.length > 0);
                    this._curPopup = null;
                    this._curRequest = null;
                    res(PopupShowResult.Done);
                    // 延迟
                    await new Promise(res => {
                        cc.Canvas.instance.scheduleOnce(res, this.interval);
                    });
                    // 下一个弹窗
                    this.next();
                });
                this._curPopup.show(options);
            } else {
                // 没有 PopupBase 组件则直接打开节点
                this._curNode.active = true;
                res(PopupShowResult.Dirty);
            }
        });
    }

    /**
     * 从缓存中获取节点
     * @param path 路径
     */
    private static getNodeFromCache(path: string): cc.Node {
        // 从节点表中获取
        if (this._nodeMap.has(path)) {
            const node = this._nodeMap.get(path);
            if (cc.isValid(node)) {
                return node;
            }
            this._nodeMap.delete(path);
        }
        // 从预制体表中获取
        if (this._prefabMap.has(path)) {
            const prefab = this._prefabMap.get(path);
            if (cc.isValid(prefab)) {
                return cc.instantiate(prefab);
            }
            this._prefabMap.delete(path);
        }
        // 无
        return null;
    }

    /**
     * 展示等待队列中的下一个弹窗
     */
    private static next(): void {
        if (this._curRequest || this._queue.length === 0) {
            return;
        }
        const request = this._queue.shift();
        this.locked = false;
        this.show(request.pathOrPrefab, request.options, request.mode);
    }

    /**
     * 添加一个弹窗请求到等待队列中，如果当前没有展示中的弹窗则直接展示该弹窗。
     * @param pathOrPrefab 弹窗预制体相对路径（如：prefabs/MyPopup）或预制体资源（不支持缓存模式和自动释放）
     * @param options 弹窗选项
     * @param mode 缓存模式
     * @param priority 是否优先展示
     */
    public static push<Options>(pathOrPrefab: string | cc.Prefab, options: Options = null, mode: PopupCacheMode = PopupCacheMode.Normal, priority: PopupShowPriority = PopupShowPriority.None): void {
        // 直接展示
        if (!this._curRequest && !this.locked) {
            this.show(pathOrPrefab, options, mode);
            return;
        }
        // 加入队列
        if (priority === PopupShowPriority.Prior) {
            this._queue.unshift({ pathOrPrefab, options, mode });
        } else {
            this._queue.push({ pathOrPrefab, options, mode });
        }
    }

    /**
     * 回收弹窗
     * @param pathOrPrefab 弹窗预制体相对路径或预制体资源
     * @param node 弹窗节点
     * @param mode 缓存模式
     */
    private static recycle(pathOrPrefab: string | cc.Prefab, node: cc.Node, mode: PopupCacheMode): void {
        // 预制体资源
        if (typeof pathOrPrefab !== 'string') {
            node.destroy();
            return;
        }
        // 预制体路径
        switch (mode) {
            case PopupCacheMode.Once:
                node.destroy();
                if (this._nodeMap.has(pathOrPrefab)) {
                    this._nodeMap.delete(pathOrPrefab);
                }
                this.release(pathOrPrefab);
                break;
            case PopupCacheMode.Normal:
                node.destroy();
                if (this._nodeMap.has(pathOrPrefab)) {
                    this._nodeMap.delete(pathOrPrefab);
                }
                break;
            case PopupCacheMode.Frequent:
                node.removeFromParent(false);
                if (!this._nodeMap.has(pathOrPrefab)) {
                    this._nodeMap.set(pathOrPrefab, node);
                }
                break;
        }
    }

    /**
     * 尝试释放弹窗资源（注意：弹窗内部动态加载的资源请自行释放）
     * @param path 弹窗预制体相对路径
     */
    public static release(path: string): void {
        let prefab = this._prefabMap.get(path);
        if (prefab) {
            this._prefabMap.delete(path);
            prefab.decRef();
            prefab = null;
        }
    }

}

/** 弹窗请求 */
export interface PopupRequest {
    /** 弹窗预制体相对路径 */
    pathOrPrefab: string | cc.Prefab;
    /** 弹窗选项 */
    options: any;
    /** 缓存模式 */
    mode: PopupCacheMode,
}

/** 弹窗请求优先级 */
export enum PopupShowPriority {
    /** 无（正常展示或排队） */
    None = 1,
    /** 优先（当前有弹窗则下一个展示目标弹窗） */
    Prior = 2,
    /** 立刻（关闭当前弹窗并立刻展示目标弹窗） */
    Immediately = 3
}

/** 弹窗请求结果 */
export enum PopupShowResult {
    /** 展示成功（已关闭） */
    Done = 1,
    /** 展示失败（加载失败） */
    Fail = 2,
    /** 等待中（已加入等待队列） */
    Wait = 3,
    /** 直接展示（未找到弹窗组件） */
    Dirty = 4
}

/** 弹窗缓存模式 */
export enum PopupCacheMode {
    /** 一次性的（立即销毁节点，预制体资源随即释放） */
    Once = 1,
    /** 正常的（立即销毁节点，但是保留预制体资源） */
    Normal = 2,
    /** 频繁的（只关闭节点，且保留预制体资源） */
    Frequent = 3
}
