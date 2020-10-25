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

    /** 当前展示中的弹窗信息 */
    public static get currents() { return this._currents; }
    private static _currents: Current[] = [];

    /** 保留状态（是否已有候选弹窗） */
    private static reserved: boolean = false;

    /** 挂起状态（有弹窗强制展示） */
    private static hidByForce: boolean = false;

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
     * @param cacheMode 缓存模式
     * @param priority 优先级
     * @example 
     * const options = {
     *     title: 'Hello',
     *     content: 'How are you?'
     * }
     * PopupManager.show('prefabs/GreetPopup', options, PopupCacheMode.Once);
     */
    public static show<Options>(pathOrPrefab: string | cc.Prefab, options: Options = null, cacheMode: PopupCacheMode = PopupCacheMode.Normal, priority: PopupShowPriority = PopupShowPriority.None): Promise<PopupShowResult> {
        return new Promise(async res => {
            cc.log('show', pathOrPrefab, options, cacheMode, priority);
            // 当前已有弹窗在展示中
            if (this._currents.length > 0 || this.reserved) {
                cc.log('当前已有弹窗在展示中')
                cc.log('currents', this._currents);
                if (priority === PopupShowPriority.Cover) {
                    cc.log('展示在当前弹窗上层')

                } else if (priority === PopupShowPriority.Force) {
                    cc.log('立即强制展示目标弹窗')
                    // 立即强制展示目标弹窗
                    while (this._currents.length > 0) {
                        const current = this._currents[0];
                        cc.log('hide', current)
                        if (current.popup) {
                            // 强制关闭当前弹窗
                            this.hidByForce = true;
                            current.popup.hide(0, true);
                            this.hidByForce = false;
                        } else if (current.node) {
                            // 没有组件直接关闭并销毁
                            current.node.active = false;
                            current.node.destroy();
                            current.node = null;
                        }
                    }
                    // 清空列表
                    // this._currents.length = 0;
                } else {
                    // 加入等待队列
                    this.push(pathOrPrefab, options, cacheMode, priority);
                    cc.log('加入等待队列', this._currents);
                    return res(PopupShowResult.Wait);
                }
            }

            // 保存为当前弹窗，阻止新的弹窗请求
            let cur: Current = {
                request: { pathOrPrefab, options, cacheMode: cacheMode },
                popup: null,
                node: null
            };
            this._currents.push(cur);
            cc.log('currents push', this._currents);

            if (typeof pathOrPrefab === 'string') {
                // 先在缓存中获取
                if (this._currents.length > 0 && priority === PopupShowPriority.Cover) {
                    // 覆盖展示不能从节点表中获取
                    if (this._prefabMap.has(pathOrPrefab)) {
                        cur.node = cc.instantiate(this._prefabMap.get(pathOrPrefab));
                    }
                } else {
                    cur.node = this.getNodeFromCache(pathOrPrefab);
                }

                // 缓存中没有，动态加载预制体资源
                if (!cc.isValid(cur.node)) {
                    // 建议在动态加载时添加加载提示并屏蔽用户点击，避免多次点击，如下：
                    // PopupManager.loadStartCallback = () => {
                    //     LoadingTip.show();
                    // }
                    this.loadStartCallback && this.loadStartCallback();
                    // 等待加载
                    await new Promise(res => {
                        cc.resources.load(pathOrPrefab, (error: Error, prefab: cc.Prefab) => {
                            if (!error) {
                                cur.node = cc.instantiate(prefab);         // 实例化节点
                                prefab.addRef();                            // 增加引用计数
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
                if (!cc.isValid(cur.node)) {
                    cc.warn('[PopupManager]', '弹窗加载失败', pathOrPrefab);
                    this._currents.splice(this._currents.indexOf(cur));
                    return res(PopupShowResult.Fail);
                }
            } else {
                // 预制体资源会直接实例化
                cur.node = cc.instantiate(pathOrPrefab);
            }

            // 添加到场景中
            cur.node.setParent(cc.Canvas.instance.node);
            // 显示在最上层
            cur.node.setSiblingIndex(cc.macro.MAX_ZINDEX);

            // 获取继承自 PopupBase 的弹窗组件
            cur.popup = cur.node.getComponent(PopupBase);
            if (cur.popup) {
                // 找到 Popup 组件
                // 设置完成回调
                cur.popup.setFinishCallback(async () => {
                    cc.log('finish', options)
                    cc.log('完成回调', cur);
                    // 回收弹窗
                    this.recycle(cur.request.pathOrPrefab, cur.node, cur.request.cacheMode);
                    // 锁定状态
                    this.reserved = (this._queue.length > 0);
                    // 周期结束
                    this._currents.splice(this._currents.indexOf(cur));
                    cur = null;
                    cc.log('currents', this._currents);
                    res(PopupShowResult.Done);
                    // 延迟
                    await new Promise(res => {
                        cc.Canvas.instance.scheduleOnce(res, this.interval);
                    });
                    // 下一个弹窗
                    if (!this.hidByForce) {
                        this.next();
                    }
                });
                // 展示弹窗
                cur.popup.show(options);
            } else {
                // 没有 PopupBase 组件则直接打开节点
                // 注意自行释放资源
                cur.node.active = true;
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
        if (this._currents.length > 0 || this._queue.length === 0) {
            return;
        }
        cc.log('下一个弹窗', this._queue);
        const request = this._queue.shift();
        this.reserved = false;
        this.show(request.pathOrPrefab, request.options, request.cacheMode);
    }

    /**
     * 添加一个弹窗请求到等待队列中，如果当前没有展示中的弹窗则直接展示该弹窗。
     * @param pathOrPrefab 弹窗预制体相对路径（如：prefabs/MyPopup）或预制体资源（不支持缓存模式和自动释放）
     * @param options 弹窗选项
     * @param cacheMode 缓存模式
     * @param priority 是否优先展示
     */
    public static push<Options>(pathOrPrefab: string | cc.Prefab, options: Options = null, cacheMode: PopupCacheMode = PopupCacheMode.Normal, priority: PopupShowPriority = PopupShowPriority.None): void {
        // 直接展示
        if (this._currents.length === 0 && !this.reserved) {
            this.show(pathOrPrefab, options, cacheMode);
            return;
        }
        // 加入队列
        if (priority === PopupShowPriority.Prior) {
            this._queue.unshift({ pathOrPrefab, options, cacheMode: cacheMode });
        } else {
            this._queue.push({ pathOrPrefab, options, cacheMode: cacheMode });
        }
    }

    /**
     * 回收弹窗
     * @param pathOrPrefab 弹窗预制体相对路径或预制体资源
     * @param node 弹窗节点
     * @param cacheMode 缓存模式
     */
    private static recycle(pathOrPrefab: string | cc.Prefab, node: cc.Node, cacheMode: PopupCacheMode): void {
        cc.log('回收弹窗');
        // 预制体资源
        if (typeof pathOrPrefab !== 'string') {
            node.destroy();
            return;
        }
        // 预制体路径
        switch (cacheMode) {
            case PopupCacheMode.Once:
                node.destroy();
                if (this._nodeMap.has(pathOrPrefab)) {
                    this._nodeMap.delete(pathOrPrefab);
                }
                // 如果当前还有弹窗在使用资源则不释放
                for (let i = 0; i < this._currents.length; i++) {
                    if (this._currents[i].request.pathOrPrefab === pathOrPrefab) {
                        return;
                    }
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
        cc.log('释放弹窗资源');
        let prefab = this._prefabMap.get(path);
        if (prefab) {
            this._prefabMap.delete(path);
            prefab.decRef();
            prefab = null;
        }
    }

    public static hasCurrent(): boolean {
        if (this._currents.length === 0) {
            return false;
        } else {
            for (let i = 0; i < this._currents.length; i++) {
                if (this._currents[i] !== null) {
                    return true;
                }
            }
        }
        return false;
    }

}

/** 弹窗请求 */
export type PopupRequest = {
    /** 弹窗预制体相对路径 */
    pathOrPrefab: string | cc.Prefab;
    /** 弹窗选项 */
    options: any;
    /** 缓存模式 */
    cacheMode: PopupCacheMode,
}

/** 展示中的弹窗信息 */
export type Current = {
    popup?: PopupBase<any>;
    node?: cc.Node;
    request?: PopupRequest;
}

/** 弹窗请求优先级 */
export enum PopupShowPriority {
    /** 无（正常展示或排队） */
    None = 1,
    /** 优先（当前有弹窗则下一个展示目标弹窗） */
    Prior = 2,
    /** 立刻（关闭当前弹窗并立刻展示目标弹窗） */
    Force = 3,
    /** 覆盖（当前有弹窗时会覆盖展示在其上层） */
    Cover = 4
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
