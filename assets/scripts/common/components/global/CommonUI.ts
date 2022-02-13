import EventManager from "../../../../eazax-ccc/core/EventManager";
import PopupManager from "../../../../eazax-ccc/core/PopupManager";
import SceneNavigator from "../../../../eazax-ccc/core/SceneNavigator";
import CaseManager from "../../CaseManager";
import { SceneName } from "../../constants/Constants";
import { CHANGE_SCENE, SWITCH_CASE } from "../../constants/CustomEvents";
import Toast from "./Toast";

const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
@executionOrder(-1)
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

    protected onEnable() {
        this.onCaseSwitch();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        // 切换
        EventManager.on(CHANGE_SCENE, this.onSceneChange, this);
        EventManager.on(SWITCH_CASE, this.onCaseSwitch, this);
        // 点击
        this.homeBtn.on(cc.Node.EventType.TOUCH_END, this.onHomeBtnClick, this);
        this.titleTip.on(cc.Node.EventType.TOUCH_END, this.onTitleTipClick, this);
    }

    /**
     * 反注册事件
     */
    protected unregisterEvent() {
        // 切换
        EventManager.off(CHANGE_SCENE, this.onSceneChange, this);
        EventManager.off(SWITCH_CASE, this.onCaseSwitch, this);
    }

    /**
     * 初始化
     */
    protected init() {
        // 弹窗容器
        PopupManager.container = this.node;
    }

    /**
     * 重置
     */
    protected reset() {
        this.titleTip.active = true;
    }

    /**
     * 首页按钮点击回调
     */
    protected onHomeBtnClick() {
        CaseManager.goHome();
    }

    /**
     * 提示点击回调
     */
    protected onTitleTipClick() {
        this.titleTip.active = false;
        Toast.show('^_^');
    }

    /**
     * 场景切换回调
     */
    protected onSceneChange() {

    }

    /**
     * 示例切换回调
     */
    protected onCaseSwitch() {
        this.homeBtn.active = (SceneNavigator.curScene !== SceneName.Home);
    }

}
