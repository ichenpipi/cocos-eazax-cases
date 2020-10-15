import EventManager from "../../eazax-ccc/core/EventManager";
import MainContent, { SWITCH_PAGE } from "./MainContent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUIManager extends cc.Component {

    @property(cc.Node)
    private homeBtn: cc.Node = null;

    @property(cc.Node)
    private titleTip: cc.Node = null

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    protected start() {
        this.titleTip.active = true;
    }

    private registerEvent() {
        this.homeBtn.on(cc.Node.EventType.TOUCH_END, this.onHomeBtnClick, this);
        this.titleTip.on(cc.Node.EventType.TOUCH_END, this.onTitleTipClick, this);

        EventManager.on(SWITCH_PAGE, this.onPageSwitch, this);
    }

    private unregisterEvent() {
        this.homeBtn.off(cc.Node.EventType.TOUCH_END, this.onHomeBtnClick, this);
        this.titleTip.off(cc.Node.EventType.TOUCH_END, this.onTitleTipClick, this);

        EventManager.off(SWITCH_PAGE, this.onPageSwitch, this);
    }

    private onHomeBtnClick() {
        MainContent.goHome();
    }

    private onTitleTipClick() {
        this.titleTip.active = false;
    }

    private onPageSwitch(name: string) {
        this.homeBtn.active = (name !== 'home');
    }

}
