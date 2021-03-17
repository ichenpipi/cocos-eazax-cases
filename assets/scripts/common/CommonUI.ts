import EventManager from "../../eazax-ccc/core/EventManager";
import { SceneName } from "./constants/Constants";
import { CHANGE_SCENE, SWITCH_CASE } from "./constants/CustomEvents";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonUI extends cc.Component {

    @property(cc.Node)
    protected homeBtn: cc.Node = null;

    @property(cc.Node)
    protected titleTip: cc.Node = null

    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    protected start() {
        this.reset();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    protected registerEvent() {
        this.homeBtn.on(cc.Node.EventType.TOUCH_END, this.onHomeBtnClick, this);
        this.titleTip.on(cc.Node.EventType.TOUCH_END, this.onTitleTipClick, this);

        EventManager.on(CHANGE_SCENE, this.onSceneChange, this);
        EventManager.on(SWITCH_CASE, this.onCaseSwitch, this);
    }

    protected unregisterEvent() {
        this.homeBtn.off(cc.Node.EventType.TOUCH_END, this.onHomeBtnClick, this);
        this.titleTip.off(cc.Node.EventType.TOUCH_END, this.onTitleTipClick, this);

        EventManager.off(CHANGE_SCENE, this.onSceneChange, this);
        EventManager.off(SWITCH_CASE, this.onCaseSwitch, this);
    }

    protected init() {
        cc.game.addPersistRootNode(this.node);
    }

    protected reset() {
        this.titleTip.active = true;
    }

    protected onHomeBtnClick() {

    }

    protected onTitleTipClick() {
        this.titleTip.active = false;
    }

    protected onSceneChange(name: string) {
        this.homeBtn.active = (name !== SceneName.Home);
    }

    protected onCaseSwitch(name: string) {

    }

}
