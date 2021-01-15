const { ccclass, property } = cc._decorator;

@ccclass
export default class FrameLoad extends cc.Component {

    @property(cc.Node)
    private item: cc.Node = null;

    @property(cc.Node)
    private content: cc.Node = null;

    @property(cc.Node)
    private normalBtn: cc.Node = null;

    @property(cc.Node)
    private clearBtn: cc.Node = null;

    @property(cc.Node)
    private frameBtn: cc.Node = null;

    protected onLoad() {
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.clearBtn.on(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
        this.frameBtn.on(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
    }

    protected onDestroy() {
        this.normalBtn.off(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.clearBtn.off(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
        this.frameBtn.off(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
    }

    private onNormalBtnClick() {
        this.clear();
        this.loadAtOnce();
    }

    private onClearBtnClick() {
        this.clear();
    }

    private onFrameBtnClick() {
        this.clear();
        this.loadByFrame();
    }

    private clear() {
        this.unscheduleAllCallbacks();
        this.content.destroyAllChildren();
    }

    private addItem(index: number) {
        const node = cc.instantiate(this.item);
        node.setParent(this.content);
        node.children[0].getComponent(cc.Label).string = (index + 1).toString();
        node.active = true;
    }

    /**
     * 一次性加载
     */
    private loadAtOnce() {
        const total = 2000;
        for (let i = 0; i < total; i++) {
            this.addItem(i);
        }
    }

    /**
     * 分帧加载
     */
    private loadByFrame() {
        const total = 2000;
        const countPerFrame = 30;
        let index = 0;
        let load = () => {
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
