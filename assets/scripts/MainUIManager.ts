import MainContent from "./MainContent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUIManager extends cc.Component {

    @property(cc.Node)
    private homeBtn: cc.Node = null;

    @property(cc.Node)
    private titleTip: cc.Node = null

    protected onLoad() {
        this.homeBtn.on(cc.Node.EventType.TOUCH_END, this.onHomeBtnClick, this);
        this.titleTip.on(cc.Node.EventType.TOUCH_END, this.onTitleTipClick, this);
    }

    protected onDestroy() {
        this.homeBtn.off(cc.Node.EventType.TOUCH_END, this.onHomeBtnClick, this);
        this.titleTip.off(cc.Node.EventType.TOUCH_END, this.onTitleTipClick, this);
    }

    protected start() {
        this.titleTip.active = true;
    }

    private onHomeBtnClick() {
        MainContent.goHome();
    }

    private onTitleTipClick() {
        this.titleTip.active = false;
    }

}
