import EventManager from "../../eazax-ccc/core/EventManager";
import { SWITCH_PAGE } from "../common/constants/CustomEvents";
import MainContent from "./MainContent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUI extends cc.Component {

    @property(cc.Node)
    protected homeBtn: cc.Node = null;

    @property(cc.Node)
    protected titleTip: cc.Node = null

    protected onLoad() {
        this.registerEvent();
    }

    protected start() {
        this.reset();
    }

    protected onDestroy() {
        this.unregisterEvent();
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

    protected reset() {
        this.titleTip.active = true;
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
