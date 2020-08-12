import MainContent from "./MainContent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUIManager extends cc.Component {

    @property(cc.Node)
    private homeBtn: cc.Node = null;

    protected onLoad() {
        this.homeBtn.on(cc.Node.EventType.TOUCH_END, this.onHomeBtnClick, this);
    }

    protected onDestroy() {
        this.homeBtn.off(cc.Node.EventType.TOUCH_END, this.onHomeBtnClick, this);
    }

    private onHomeBtnClick() {
        MainContent.goHome();
    }

}
