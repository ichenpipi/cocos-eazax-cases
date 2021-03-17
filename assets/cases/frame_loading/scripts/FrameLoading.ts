const { ccclass, property } = cc._decorator;

@ccclass
export default class FrameLoading extends cc.Component {

    @property(cc.Node)
    protected item: cc.Node = null;

    @property(cc.Node)
    protected content: cc.Node = null;

    @property(cc.Node)
    protected normalBtn: cc.Node = null;

    @property(cc.Node)
    protected clearBtn: cc.Node = null;

    @property(cc.Node)
    protected frameBtn: cc.Node = null;

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    protected registerEvent() {
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.clearBtn.on(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
        this.frameBtn.on(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
    }

    protected unregisterEvent() {
        this.normalBtn.off(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.clearBtn.off(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
        this.frameBtn.off(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
    }

    protected onNormalBtnClick() {
        this.clear();
        this.loadAtOnce();
    }

    protected onClearBtnClick() {
        this.clear();
    }

    protected onFrameBtnClick() {
        this.clear();
        this.loadByFrame();
    }

    protected clear() {
        this.unscheduleAllCallbacks();
        this.content.destroyAllChildren();
    }

    protected addItem(index: number) {
        const node = cc.instantiate(this.item);
        node.setParent(this.content);
        node.children[0].getComponent(cc.Label).string = (index + 1).toString();
        node.active = true;
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
    protected loadByFrame() {
        const total = 2000;
        const countPerFrame = 30;
        let index = 0;
        const load = () => {
            // 加载
            if (index < total) {
                const count = Math.min(total - (index + 1), countPerFrame);
                for (let i = 0; i < count; i++) {
                    this.addItem(index++);
                }
            }
            // 是否还有
            if (index < total) {
                this.scheduleOnce(() => load());
            }
        }
        load();
    }

}
