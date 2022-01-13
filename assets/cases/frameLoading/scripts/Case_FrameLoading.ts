const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_FrameLoading extends cc.Component {

    @property(cc.Node)
    protected itemPrefab: cc.Node = null;

    @property(cc.Node)
    protected content: cc.Node = null;

    @property(cc.Node)
    protected normalBtn: cc.Node = null;

    @property(cc.Node)
    protected clearBtn: cc.Node = null;

    @property(cc.Node)
    protected frameBtn: cc.Node = null;

    /**
     * 生命周期：加载
     */
    protected onLoad() {
        this.registerEvent();
    }

    /**
     * 生命周期：销毁
     */
    protected onDestroy() {
        this.unregisterEvent();
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.clearBtn.on(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
        this.frameBtn.on(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
    }

    /**
     * 反注册事件
     */
    protected unregisterEvent() {
        this.normalBtn.off(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.clearBtn.off(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
        this.frameBtn.off(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
    }

    /**
     * 普通加载按钮回调
     */
    protected onNormalBtnClick() {
        this.clear();
        this.loadAtOnce();
    }

    /**
     * 清除按钮回调
     */
    protected onClearBtnClick() {
        this.clear();
    }

    /**
     * 分帧加载按钮回调
     */
    protected onFrameBtnClick() {
        this.clear();
        this.loadByFrames();
    }

    /**
     * 一次性加载
     */
    protected loadAtOnce() {
        const total = 2000;
        for (let i = 0; i < total; i++) {
            this.addItem(i);
        }
    }

    /**
     * 分帧加载
     */
    protected loadByFrames() {
        const total = 2000,
            countPerFrame = 30; // 每帧加载的数量
        let index = 0;  // 当前下标
        // 加载函数
        const load = () => {
            // 加载 item
            const count = Math.min(total - index, countPerFrame);
            for (let i = 0; i < count; i++) {
                this.addItem(index);
                index++;
            }
            // 是否还有
            if (index < total) {
                // 下一帧继续加载
                this.scheduleOnce(() => load());
            }
        }
        // 开始加载
        load();
    }

    /**
     * 添加 item
     * @param index 下标
     */
    protected addItem(index: number) {
        const node = cc.instantiate(this.itemPrefab);
        node.setParent(this.content);
        node.getComponentInChildren(cc.Label).string = `${index + 1}`;
        node.active = true;
    }

    /**
     * 清除
     */
    protected clear() {
        this.unscheduleAllCallbacks();
        this.content.destroyAllChildren();
    }

}
