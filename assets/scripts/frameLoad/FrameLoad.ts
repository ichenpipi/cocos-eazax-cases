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
    private frameBtn: cc.Node = null;

    protected onLoad() {
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.frameBtn.on(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
    }

    protected onDestroy() {
        this.normalBtn.off(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.frameBtn.off(cc.Node.EventType.TOUCH_END, this.onFrameBtnClick, this);
    }

    private onNormalBtnClick() {
        this.content.destroyAllChildren();
        this.loadAllAtOnce();
    }

    private onFrameBtnClick() {
        this.content.destroyAllChildren();
    }

    private addItem(index: number) {
        const node = cc.instantiate(this.item);
        node.setParent(this.content);
        node.children[0].getComponent(cc.Label).string = (index + 1).toString();
        node.active = true;
    }

    private loadAllAtOnce() {
        for (let i = 0; i < 2000; i++) {
            this.addItem(i);
        }
    }

    private loadByFrame() {
        let count = 500;
        let index = 0;
        let load = () => {

        }
    }

}
