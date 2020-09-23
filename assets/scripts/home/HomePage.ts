import MainContent from "../MainContent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HomePage extends cc.Component {

    @property(cc.Node)
    private btnsContainer: cc.Node = null;

    private btns: cc.Node[] = null;

    protected onLoad() {
        this.btns = this.btnsContainer.children;
        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }
    }

    protected onDestroy() {
        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].off(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }
    }

    private onBtnClick(event: cc.Event.EventTouch) {
        MainContent.goCase(event.target.name);
    }

}
